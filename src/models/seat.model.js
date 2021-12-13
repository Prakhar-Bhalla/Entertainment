const {Schema, model} = require("mongoose");

const seatSchema = new Schema({
    show : {type: Schema.Types.ObjectId, ref: "show", required: true}
}, {versionKey: false, timestamps: true});

const Seat = model("user", seatSchema);

module.exports = Seat;