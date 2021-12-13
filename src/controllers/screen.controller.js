const express = require("express");

const router = express.Router();

const Screen = require("../models/screen.model");

router.post("/", async(req, res) => {
    try {
        const screen = await Screen.create(req.body);
        res.status(201).send({screen});
    } catch(e) {
        res.status(500).send({status: "failed", message: e.message});
    }
});

module.exports = router;