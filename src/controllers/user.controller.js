const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const upload = require("../middlewares/upload");

router.post("/", upload.single("image_url"), async(req, res) => {
    try {
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            profile_photo_url : req.file.path,
            roles : req.body.roles
        });
        res.status(201).send({user});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
});

module.exports = router;