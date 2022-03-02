require('dotenv').config()
const cors = require('cors');
const express = require('express');

const app = express();

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

/**
 * App listen
 */
app.listen(process.env.API_PORT, () => {
  console.log(`App server now listening on port ${process.env.API_PORT}`);
});
