const {Schema, model} = require("mongoose");

const theaterSchema = new Schema({
    name : {type: String, required: true},
    location : {type: String, required: true}
}, {versionKey: false, timestamps: true});

const Theater = model("theater", theaterSchema);

module.exports = Theater;