const express = require('express');
const BookingsController = require("../controllers/bookings.controller");

const bookingsRouter = express.Router();

bookingsRouter.post('/', BookingsController.createBooking);

// TODO add updation

// TODO add cancellation

module.exports = bookingsRouter;
