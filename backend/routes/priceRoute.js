const { toDate } = require("date-fns");
const express = require("express");

const router = express.Router();

const Price = require("../models/price");

router.post("/addprice", async (req, res) => {
  let { name, fromdate, todate, percent } = req.body;
  try {

    const newPrice = new Price({
      name,
      fromdate,
      todate,
      percent,
    });
    return newPrice;
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
