const { toDate } = require("date-fns");
const express = require("express");
const moment = require("moment");
// const stripe = require("stripe")("YOUR PRIVATE STRIP API KEY"); //
const { v4: uuidv4 } = require("uuid"); //https://www.npmjs.com/package/uuid

const router = express.Router();

const Booking = require("../models/booking");
const Price = require("../models/price");
const Room = require("../models/room");

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/getSpecificBooking/:bookingId", async (req, res) => {
  console.log("Get specific bookings");
  const bookingId = req.params.bookingId;
  try {
    console.log("In try");
    const bookings = await Booking.findOne({ _id: bookingId });
    console.log(bookings);
    res.send(bookings);
  } catch (error) {
    console.log("In catch");

    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.put("/editBooking/:bookingId", async (req, res) => {
  console.log("update specific bookings");
  const bookingId = req.params.bookingId;
  const fromdate = req.body.fromDate;
  const todate = req.body.toDate;
  const totaldays = req.body.totalDays;
  var totalAmount = req.body.totalAmount;
  const perday = req.body.remainingAmount;
  // const remainingAmount = req.body.remainingAmount;
  const fromDateNew = moment(
    fromdate.split("-").reverse().join("/"),
    "YYYY/MM/DD"
  );
  const toDateNew = moment(todate.split("-").reverse().join("/"), "YYYY/MM/DD");
  const newtotaldays = Math.floor((toDateNew - fromDateNew) / 86400000) + 1;
  const remainingAmount = Math.abs(newtotaldays - totaldays) * perday;
  const ntotalAmount = totalAmount + remainingAmount;
  console.log(
    "fromdate " +
      fromdate +
      "todate " +
      todate +
      "totaldays" +
      totaldays +
      "ntotaldays" +
      newtotaldays +
      "remainingAmount " +
      remainingAmount +
      "totalAmount" +
      ntotalAmount
  );

  try {
    console.log("In try");
    const bookings = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      {
        fromdate: fromdate,
        todate: todate,
        totaldays: newtotaldays,
        remainingAmount: remainingAmount,
        totalamount: ntotalAmount,
      }
    );
    console.log(bookings);
    res.send(bookings);
  } catch (error) {
    console.log("In catch");

    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });

    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/bookroom", async (req, res) => {
  console.log(req.body);
  let {
    room,
    userid,
    fromdate,
    todate,
    totalAmount,
    totaldays,
    extracostapplied,
    offerapplied,
    guestscount,
    remainingAmount,
  } = req.body;

  try {
    if (
      moment(fromdate).format("dddd") === "Saturday" ||
      moment(fromdate).format("dddd") === "Sunday"
    ) {
      if (room.percenthikeperdayonweekend) {
        totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
        extracostapplied += " Weekend Peak Price";
      }
    } else {
      let dynamicPrices = await Price.findAll();
      dynamicPrices.some((pr) => {
        if (
          moment(fromdate, "MM-DD-YYYY").isBetween(
            moment(pr.fromdate, "DD-MM-YYYY"),
            moment(pr.todate, "DD-MM-YYYY")
          )
        ) {
          totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
          extracostapplied += " Holiday Peak Price";
          return true;
        }
        return false;
      });
    }
    // Check for extra guests
    if (guestscount) {
      if (guestscount > room.freeguestcount) {
        totalAmount +=
          (guestcount - room.freeguestcount) *
          totaldays *
          room.rentperextraguestperday;
        extracostapplied += ` ${
          guestcount - room.freeguestcount
        } extra guests added`;
      }
    }
    // Give loyality discount, if already have booked the same room in past
    const prevBooking = await Booking.findOne({
      where: {
        userid,
        roomid: room._id,
      },
    });
    if (prevBooking) {
      totalAmount -= totalAmount / 20;
      offerapplied += " Customer Loyality discount (5%)";
    }

    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: totalAmount,
      totaldays,

      remainingAmount,

      extracostapplied,
      offerapplied,

      transactionid: uuidv4(),
    });

    const booking = await newBooking.save();
    console.log("Booking saved");

    const roomTmp = await Room.findOne({ _id: room._id });
    roomTmp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userid,
      status: booking.status,
    });

    await roomTmp.save();
    res.send("Payment Successful, Your Room is booked");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
