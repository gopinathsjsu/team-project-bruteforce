const { toDate } = require("date-fns");
const express = require("express");

const router = express.Router();

const Price = require("../models/price");

router.get("/getallpeakprices", async (req, res) => {
  try {
    const prices = await Price.find({});
    console.log(prices);
    res.send(prices);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getpricesbyid/:id", async (req, res) => {
  console.log(
    "----------------------- getallpeakprices by id ------------------------"
  );
  const id = req.params.id;
  try {
    const prices = await Price.find({ _id: id });
    console.log(prices);
    res.send(prices);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/deleteprice/:id", async (req, res) => {
  console.log(
    "----------------------- delete price by id ------------------------"
  );
  const id = req.params.id;
  try {
    const prices = await Price.findByIdAndDelete({ _id: id });
    console.log(prices);
    res.send(prices);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/editDiscount/:priceId", async (req, res) => {
  console.log("update specific bookings");
  const priceId = req.params.priceId;
  const fromdate = req.body.fromDate;
  const todate = req.body.toDate;
  const percent = req.body.percent;
  console.log(req.body);
  console.log("update specific booking s ================================");
  console.log(req.body.percent);

  try {
    console.log("In try");
    const prices = await Price.findOneAndUpdate(
      { _id: priceId },
      {
        fromdate,
        todate,
        percent,
      }
    );
    console.log(prices);
    res.send(prices);
  } catch (error) {
    console.log("In catch");

    console.log(error);
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
