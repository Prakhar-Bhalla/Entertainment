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

router.get("/:actor", async(req, res) => {
    try {
        const movies = await Movie.find().lean().exec();
        const reqMovies = movies.filter((m) => {
            return m.actors[0].includes(req.params.actor);
        })
        res.status(201).send({reqMovies});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
})

module.exports = router;