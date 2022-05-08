const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    maxcount: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    percenthikeperdayonweekend: {
      type: Number,
      required: true,
      default: 50,
    },
    imageurls: [],
    currentbookings: [],
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
