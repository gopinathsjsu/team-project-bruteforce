require("dotenv").config();
const cors = require("cors");
const express = require("express");
const models = require("./src/api/v1/models");

const authMiddleware = require("./src/api/v1/middlewares/auth.middleware");

const app = express();

const authRouter = require("./src/api/v1/routers/auth.router");
const hotelsRouter = require("./src/api/v1/routers/hotels.router");
const roomsRouter = require("./src/api/v1/routers/rooms.router");

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
    message: "Server on",
  });
});

app.use("/api/v1/auth", authRouter);

app.use(authMiddleware);

app.use("/api/v1/hotels", hotelsRouter);

app.use("/api/v1/rooms", roomsRouter);

/**
 * App listen
 */

// const PORT = process.env.PORT || 3333;
// models.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log("Serving running on port 3333");
//   });
// });
app.listen(process.env.API_PORT || 3333, () => {
  console.log(
    `App server now listening on port ${process.env.API_PORT || 3333}`
  );
});
