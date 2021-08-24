const Snippet = require('../models/Snippet');

exports.createSnippet = async (req, res) => {
    try {
        const newSnippet = await Snippet.create({
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
            author: req.body.author,
            language: req.body.language
        })
       
       
        res.status(200).json({message: 'Snippet created.', newSnippet: newSnippet})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message})
    }
    
}

exports.viewSnippets = async (req, res) =>{
    try {
        const snippets = await Snippet.find().populate('user_id')

        res.status(200).json({message: 'Snippets found', snippets: [{snippets}]})
    } catch (error) {
        res.status(400).json({error: error})
    }
}

exports.viewSnippetsLanguage = async (req, res)=>{
    try {
        const categorizedSnipp = await Snippet.find({language: req.params.language}).populate('user_id')

        if(categorizedSnipp.language === null) {
            res.status(400).json({message: 'Snippet language is required.'})
        }
        res.status(200).json({message: 'Snippets found', categorizedSnipp: categorizedSnipp})
    } catch (error) {
        res.status(400).json({error: error})
    }
}

exports.updateSnippet = async (req, res) =>{
    try {
        const updated = await Snippet.findOne({_id: req.body._id})

        if(updated._id === null || updated._id === undefined){
            res.status(400).json({message: 'Snippet id is invalid'})
        }
        await updated.updateOne({content:req.body.content})
        updated.dates.last_edit = new Date()
        res.status(200).json({message: 'Snippet updated', updated: updated})
    } catch (error) {
        res.status(400).json({error: error})
    }
}

exports.upvoteSnippet = async (req, res) => {
    try {
        const upvoted = await Snippet.findOne({_id: req.body._id})
        if(upvoted._id === null || upvoted._id === undefined){
            res.status(400).json({message: 'Snippet id is invalid'})
        }
        await upvoted.updateOne({upvote: req.body.upvote})
        upvoted.upvote = upvoted.upvote + 1
        res.status(200).json({message:'upvoted successfully', upvoted:upvoted})

    } catch (error) {
        res.status(400).json({error: error})
    }
}
exports.downvoteSnippet = async (req, res) => {
    try {
        const downvoted = await Snippet.findOne({_id: req.body._id})
        if(downvoted._id === null || downvoted._id === undefined){
            res.status(400).json({message: 'Snippet id is invalid'})
        }
        await downvoted.updateOne({downvote: req.body.downvote})
        downvoted.downvote = downvoted.downvote + 1
        res.status(200).json({message:'downvoted successfully', downvoted:downvoted})

    } catch (error) {
        res.status(400).json({error: error})
    }
}

exports.favouriteSnippet = async (req, res) => {
    try {
        const favourite = await Snippet.findOne({_id: req.body._id})
        if(favourite._id === null || favourite._id === undefined){
            res.status(400).json({message: 'Snippet id is invalid'})
        }
        await favourite.updateOne({favourite: req.body.favourite})
        favourite.favourite = true
        res.status(200).json({message:'favourite mark successfully'})
    } catch (error) {
        
    }
}