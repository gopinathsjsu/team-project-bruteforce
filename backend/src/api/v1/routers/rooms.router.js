const express = require('express');
const RoomsController = require("../controllers/rooms.controller");

const roomsRouter = express.Router();

roomsRouter.post('/', RoomsController.addRoom);

module.exports = roomsRouter;
