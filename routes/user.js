require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
jwtsecret = process.env.jwtsecret;
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");
const mongoose = require("mongoose");
const axios = require("axios");

// POST  '/register'
// DESC register user
// Public
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(mongoose.connection.readyState);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "User already exist with that email" });
      }
      user = new User({
        username: username,
        email: email,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log(user);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log(payload);
      jwt.sign(payload, jwtsecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        console.log(token);
        return res.json({ token });
      });
    } catch (error) {
      res.status(400).json({ msg: "Server Error" });
      console.log(error);
    }
  }
);

module.exports = router;
