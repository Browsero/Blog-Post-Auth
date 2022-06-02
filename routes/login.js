const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

const handleLoginPost = (req, res) => {
  const userData = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(userData, (err) => {
    if (err) {''
      res.render("../views/login", { error: `Failed to login.` });
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/blog");
      });
    }
  });
};

const handleLogin = (req, res) => {
  res.render("../views/login", { error: "" });
};

router.get("/", handleLogin).post("/", handleLoginPost);

module.exports = router;
