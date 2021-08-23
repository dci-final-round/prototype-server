const express = require("express");
const controller = require('../controllers/snippetController');
const router = express.Router();
const passport = require('passport');

router.post('/new', passport.authenticate('jwt',{session:false}), controller.createSnippet)



module.exports = router;