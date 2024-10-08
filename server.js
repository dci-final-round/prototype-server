const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const passport = require("passport");
const passportConfig = require("./passport-config");
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/user");
const snippetRoutes = require("./routes/snippet");
const app = express();
app.use(cors());
passportConfig(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log("Database is not connected!", error));

app.use("/user", userRoutes);
app.use("/snippet", snippetRoutes);

app.all("*", (req, res) => {
  res.status(500);
  res.send("Invalid path");
});

app.listen(PORT, () => {
  console.log("Connected on port %s", PORT);
});
