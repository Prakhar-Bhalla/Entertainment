const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

require("dotenv").config();

const register = async(req, res) => {
    try {
        let user = await User.findOne({email : req.body.email}).lean().exec();
        if(user)
        {
            return res.send("User already exist");
        }
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            profile_photo_url : req.file.path,
            roles : req.body.roles
        })
        const token = jwt.sign({ user : user }, process.env.TOKEN_KEY);

        res.json({user, token});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
}

const login = async(req, res) => {
    try {
        let user = await User.findOne({email : req.body.email});
        if(!user)
        {
            return res.send("Wrong email or password");
        }
        const match = await user.checkPassword(req.body.password);
        if(!match)
        {
            return res.status(400).send("Please provide a correct email and password");
        }
        const token = jwt.sign({ user : user }, process.env.TOKEN_KEY);
        res.json({user, token});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
}

module.exports = {login, register};