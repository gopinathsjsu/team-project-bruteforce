require('dotenv').config()
const cors = require('cors');
const express = require('express');

const app = express();

const usersRouter = require("./src/api/v1/routers/users.router");
const authRouter = require("./src/api/v1/routers/auth.router");

/**
 * Middlewares
 */
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server on',
  });
});


app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', usersRouter);


/**
 * App listen
 */
app.listen(process.env.API_PORT, () => {
  console.log(`App server now listening on port ${process.env.API_PORT}`);
});
