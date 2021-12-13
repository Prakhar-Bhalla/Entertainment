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

router.get("/show/:id", async(req, res) => {
    try {
        const seats = await Seat.find({show: req.params.id}).lean().exec();
        res.status(201).send({seats});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
})


module.exports = router;