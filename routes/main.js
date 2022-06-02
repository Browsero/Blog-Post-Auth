const express = require("express");
const router = express.Router();

const handleHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/blog");
  } else {
    res.render("../views/home");
  }
};

router.get("/", handleHome);

module.exports = router;
