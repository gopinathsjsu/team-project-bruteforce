const express = require('express');
const AuthController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post('/create', AuthController.createUser);

authRouter.post('/sign-out', AuthController.signOut);

authRouter.post('/sign-out', AuthController.signOut);

module.exports = authRouter;
