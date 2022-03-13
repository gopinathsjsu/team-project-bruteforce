const express = require('express');
const BookingsController = require("../controllers/bookings.controller");

const bookingsRouter = express.Router();

bookingsRouter.post('/', BookingsController.createBooking);

module.exports = bookingsRouter;
