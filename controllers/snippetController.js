const Snippet = require('../models/Snippet');

exports.createSnippet = async (req, res) => {
    try {
        const newSnippet = await Snippet.create({
            title: req.body.title,
            content: req.body.content,
            description: req.body.description,
            author: req.user._id
        })
       
        res.status(200).json({message: 'Snippet created.', newSnippet: newSnippet})
    } catch (error) {
        res.status(400).json({message: error})
       
    }
    console.log(user._id)
}