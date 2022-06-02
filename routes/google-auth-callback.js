const express = require("express");
const passport = require("passport");
const router = express.Router();

const handleGoogleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});
const redirectHandler = (req, res) => {
  res.redirect("/blog");
};

router.get("/", handleGoogleAuthCallback, redirectHandler);

module.exports = router;
