const express = require("express");

const router = express.Router();

const Seat = require("../models/seat.model");

router.post("/", async(req, res) => {
    try {
        const seat = await Seat.create(req.body);
        res.status(201).send({seat});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
});

module.exports = router;