const express = require("express");

const router = express.Router();

const Seat = require("../models/seat.model");

const Show = require("../models/show.model");

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
        const seats = await Seat.find({show: req.params.id}).populate("show").lean().exec();
        res.status(201).send({seats});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
})

router.patch("/show/:id", async(req, res) => {
    try {
        const seat = await Seat.findOne({show: req.params.id}).populate("show").lean().exec();
        const show = await Show.findById(seat.show._id).lean().exec();
        const x = show.total_seats - (+(req.query.seats));
        if(x<0)
        {
            return res.status(201).send("Seats not available");
        }
        const updatedShow = await Show.findByIdAndUpdate(seat.show._id, {$set: {total_seats : x}}, {new: true}).lean().exec();
        res.status(201).send({updatedShow});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
})


module.exports = router;