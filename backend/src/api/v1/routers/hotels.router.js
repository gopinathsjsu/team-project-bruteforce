const express = require('express');
const HotelsController = require("../controllers/hotels.controller");

const hotelsRouter = express.Router();

hotelsRouter.post('/', HotelsController.createHotel);


hotelsRouter.post('/search', HotelsController.searchHotels);


module.exports = hotelsRouter;
