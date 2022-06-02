const express = require("express");
const Post = require("../models/post");
const router = express.Router();

const handleBlog = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.error(err);
    } else {
      if (posts) {
        if (req.isAuthenticated()) {
          res.render("../views/blog", { posts: posts });
        } else {
          res.redirect("/login", {error: ""});
        }
      }
    }
  });
};

router.get("/", handleBlog);

module.exports = router;
