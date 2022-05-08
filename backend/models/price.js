const mongoose = require("mongoose");

const priceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    percent: { type: Number, required: true },
  },
  { timestamps: true }
);

const priceModel = mongoose.model("prices", priceSchema);

module.exports = priceModel;
