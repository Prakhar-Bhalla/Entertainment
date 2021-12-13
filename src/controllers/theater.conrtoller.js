const express = require("express");

const router = express.Router();

const Theater = require("../models/theaters.model");

router.post("/", async(req, res) => {
    try {
        const theater = await Theater.create(req.body);
        res.status(201).send({theater});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
});

module.exports = router;