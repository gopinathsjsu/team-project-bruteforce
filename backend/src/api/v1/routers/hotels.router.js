const express = require('express');
const HotelsController = require("../controllers/hotels.controller");

const hotelsRouter = express.Router();

hotelsRouter.post('/', HotelsController.createHotel);


hotelsRouter.post('/search', HotelsController.searchHotels);

hotelsRouter.post('/add-booking', HotelsController.addBooking);

hotelsRouter.post('/update-booking', HotelsController.updateBooking);

hotelsRouter.post('/cancel-booking', HotelsController.cancelBooking);

hotelsRouter.post('/add-peak-price', HotelsController.addPeakPrice);


module.exports = hotelsRouter;
