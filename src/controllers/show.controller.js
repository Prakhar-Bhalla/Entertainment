const express = require("express");

const router = express.Router();

const Show = require("../models/show.model");

router.post("/", async(req, res) => {
    try {
        const show = await Show.create(req.body);
        res.status(201).send({show});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
});

module.exports = router;