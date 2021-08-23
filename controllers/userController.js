const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtIssuer = require('../helpers/jwtIssuer');

exports.register= async (req,res) =>{
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashed
           
        })
        res.status(200).json({message: 'User created', user: newUser});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'User already exists', error: error});
    }
}

exports.login = async (req, res) =>{
    try {
        const user = await User.findOne({username: req.body.username})

        if(user == null) {
            return res.status(403).json({message:'user does not exist'});
        }

        var checkPassword = await bcrypt.compare(req.body.password, user.password);
        if(checkPassword){ 
            const token = jwtIssuer.generateToken(user);
            console.log('token is ', token);
           

            return res.status(200).json({message:'Success', token:token});
        }else{
            return res.status(400).json({message:'password does not match'})
        }
    } catch (error) {
        console.error(error);
    }
}