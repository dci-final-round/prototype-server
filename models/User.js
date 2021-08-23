const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true},
    ip: {type: String},
    password: {type: String, required: true},
    dates: {
        registered: {type: Date, default: Date.now()},
        last_active: {type: Date}
    },
    savedSnippets: {type:Array, default: []}
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
