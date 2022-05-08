const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: { type: String, required: true },
    status: { type: String, required: true, default: "booked" },
    roomid: { type: String, required: true },
    userid: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
      extracostapplied: {type: String, required: false},
      offerapplied: {type: String, required: false},
    totalamount: {
      type: Number,
      required: true,
    },
    totaldays: {
      type: Number,
      required: true,
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
