const mongoose = require("mongoose");
const User = require('./User');


const SnippetSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type:String, required: true},
    description: {type: String, required: true},
    author: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    upvote: {type:Number},
    downvote:{type:Number},
    language: {type:String},   //enum
    tags:{type:Array}  //enum
    
});

const Snippet = mongoose.model("snippet", SnippetSchema);

module.exports = Snippet;
