const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const Movie = require("../models/movie.model");

const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, upload.single("image_url"), async(req, res) => {
    try {
        const movie = await Movie.create({
            name : req.body.name,
            actors : req.body.actors,
            languages : req.body.languages,
            directors : req.body.directors,
            poster_url : req.file.path
        })
        res.status(201).send({movie});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
})

module.exports = router;