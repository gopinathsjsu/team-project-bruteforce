const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://202loadbalancer-1845045619.us-east-2.elb.amazonaws.com:3000", "http://3.145.72.79:3000", "http://18.117.78.120:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const priceRoute = require("./routes/priceRoute");

app.use(express.json());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/price", priceRoute);
app.use("/api/bookings", bookingRoute);

const port = process.env.PORT || 4000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node app listening on ${port} port!`));
