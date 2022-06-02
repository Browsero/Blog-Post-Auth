const express = require("express");
const router = express.Router();

const handleLogout = (req, res, next) => {
  req.logout((err)=>{
    if(err) return next(err);
  });
  res.redirect("/");
};

router.get("/", handleLogout);

module.exports = router;
