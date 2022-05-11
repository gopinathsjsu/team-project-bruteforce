const { toDate } = require("date-fns");
const express = require("express");

const router = express.Router();

const Price = require("../models/price");

router.get("/getallpeakprices", async (req, res) => {
  console.log(
    "----------------------- getallpeakprices ------------------------"
  );
  try {
    const prices = await Price.find({});
    console.log(prices);
    res.send(prices);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addprice", async (req, res) => {
  console.log("---------------- add peak price --------------------");
  let { name, fromdate, todate, percent } = req.body;
  console.log(req.body);
  try {
    const newPrice = new Price({
      name,
      fromdate,
      todate,
      percent,
    });
    const newPeakPrice = await newPrice.save();
    res.send("User Registered Successfully");
    // return newPrice;
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
