const express = require('express');
const UsersController = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.post('/', UsersController.createUser);

module.exports = usersRouter;
