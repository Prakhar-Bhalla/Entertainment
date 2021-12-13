const {Schema, model} = require("mongoose");

const screenSchema = new Schema({
    name : {type: String, required: true},
    theater : {type: Schema.Types.ObjectId, ref: "theater", required: true}
}, {versionKey: false, timestamps: true});

const Screen = model("screen", screenSchema);

module.exports = Screen;