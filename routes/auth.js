require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const jwtsecret = process.env.jwtsecret;
const jwt = require("jsonwebtoken");

// GET  '/'
// DESC authenticate user
// Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(payload, jwtsecret, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          return res.json({ token });
        });
      } else {
        return res.status(400).json({ msg: "Bad Credentials" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
