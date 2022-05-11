const { toDate } = require("date-fns");
const express = require("express");
const { from } = require("formidable/src/parsers/Dummy");
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
  const remaining = (newtotaldays - totaldays) * perday;
  var ntotalAmount = totalAmount + remaining;
  // if (newtotaldays - totaldays > 0) {
  //   var ntotalAmount = totalAmount + remaining;
  // } else {
  //   var ntotalAmount = totalAmount;
  // }

  // console.log(
  //   "fromdate " +
  //     fromdate +
  //     "todate " +
  //     todate +
  //     "totaldays" +
  //     totaldays +
  //     "ntotaldays" +
  //     newtotaldays +
  //     "remainingAmount " +
  //     remainingAmount +
  //     "totalAmount" +
  //     ntotalAmount
  // );

  try {
    console.log("In try");
    const bookings = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      {
        fromdate: fromdate,
        todate: todate,
        totaldays: newtotaldays,
        //remainingAmount: remainingAmount,
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
  console.log(
    "=================================== in add book room ================================"
  );
  // console.log(req.body);
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
      console.log(
        "===========================week end price-----------------------"
      );
      if (room.percenthikeperdayonweekend) {
        totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
        extracostapplied += " Weekend Peak Price";
      }
    } else {
      let dynamicPrices = await Price.find({});
      dynamicPrices.some((pr) => {
        if (
          moment(fromdate, "MM-DD-YYYY").isBetween(
            moment(pr.fromdate, "DD-MM-YYYY"),
            moment(pr.todate, "DD-MM-YYYY")
          )
        ) {
          totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
          extracostapplied += " Holiday Peak Price";
          console.log(
            "===========================dynamic price-----------------------"
          );
          return true;
        }
        return false;
      });
    }
    // Check for extra guests
    console.log(
      "===========================checking guests count -----------------------"
    );
    if (guestscount) {
      if (guestscount > room.freeguestcount) {
        totalAmount +=
          (guestscount - room.freeguestcount) *
          totaldays *
          room.rentperextraguestperday;
        extracostapplied += ` ${
          guestscount - room.freeguestcount
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
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getprice", async (req, res) => {
  console.log(
    "=================================== in add get price ================================"
  );
  // console.log(req.body);
  console.log(moment(req.body.fromdate));
  console.log(req.body.todate);

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
    console.log(moment(fromdate));
    console.log(
      moment(fromdate).isBetween(
        moment("10-05-2022", "DD-MM-YYYY"),
        moment("13-05-2022", "DD-MM-YYYY")
      )
    );
    console.log(moment("11-05-2022", "DD-MM-YYYY"));

    if (
      moment(fromdate).format("dddd") === "Saturday" ||
      moment(fromdate).format("dddd") === "Sunday"
    ) {
      totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
      extracostapplied += " Weekend Peak Price Applied";
    } else {
      console.log(
        "=========================== dynamic price started -----------------------"
      );

      let dynamicPrices = await Price.find({});

      let count = 0;
      for (var i = 0; i < dynamicPrices.length; i++) {
        if (
          moment(fromdate).isBetween(
            moment(dynamicPrices[i].fromdate, "DD-MM-YYYY"),
            moment(dynamicPrices[i].todate, "DD-MM-YYYY")
          )
        ) {
          console.log("APPLY DP");
          count = count + 1;
          break;
        }
      }

      console.log(count);

      if (count >= 1) {
        totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
        extracostapplied += " Holiday Peak Price Applied";
        console.log(
          "===========================  dynamic price applied -----------------------"
        );
      } else {
        totalAmount = totalAmount;
      }

      // console.log(dynamicPrices);
      // console.log(dynamicPrices);
      // dynamicPrices.some((pr) => {
      //   if (
      //     moment(fromdate, "DD-MM-YYYY").isBetween(
      //       moment(pr.fromdate, "DD-MM-YYYY"),
      //       moment(pr.todate, "DD-MM-YYYY")
      //     )
      //   ) {
      //     totalAmount += (totalAmount * room.percenthikeperdayonweekend) / 100;
      //     extracostapplied += " Holiday Peak Price";
      //     console.log(
      //       "===========================  dynamic price -----------------------"
      //     );
      //     return true;
      //   }
      //   return false;
      // });
    }

    // Check for extra guests
    console.log(
      "===========================checking guests count -----------------------"
    );
    if (guestscount) {
      if (guestscount > room.freeguestcount) {
        totalAmount +=
          (guestscount - room.freeguestcount) *
          totaldays *
          room.rentperextraguestperday;
        extracostapplied += ` ${
          guestscount - room.freeguestcount
        } extra guests added`;
      }
    }

    // Give loyality discount, if already have booked the some room in past

    //code for customer loyalty
    const prevBooking = await Booking.find({
      $and: [{ userid: userid }, { roomid: room._id }],
    });

    console.log(prevBooking.length + "--------- prev booking ---------");

    if (prevBooking.length > 0) {
      totalAmount -= totalAmount / 20;
      offerapplied += " Customer Loyality discount (5%)";
    } else {
      totalAmount = totalAmount;
    }

    res.send({ extracostapplied, offerapplied, totalAmount });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
