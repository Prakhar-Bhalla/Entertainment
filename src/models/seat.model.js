const {Schema, model} = require("mongoose");

const seatSchema = new Schema({
    show : {type: Schema.Types.ObjectId, ref: "show", required: true}
}, {versionKey: false, timestamps: true});

const Seat = model("seat", seatSchema);

module.exports = Seat;