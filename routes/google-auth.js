const express = require("express");
const passport = require("passport");
const router = express.Router();

const handleGoogleAuth = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

router.get("/", handleGoogleAuth);

module.exports = router;
