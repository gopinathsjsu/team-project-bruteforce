const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    console.log(user);
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        rewards: user.rewards,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.put("/updateUserRewards/:id", async (req, res) => {
  console.log(req.params.id);
  console.log("-----------------in update rewards");
  // console.log(req);

  try {
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      { rewards: 0 }
    );
    console.log(result);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});
module.exports = router;
