const _ = require("lodash");
const express = require("express");
const Post = require("../models/post");
const router = express.Router();

const handlePost = (req, res) => {
  if (req.isAuthenticated()) {
    Post.findOne({ title: req.params.postTitle }, (err, post) => {
      if (err) {
        console.error(err);
      } else {
        if (post) {
          res.render("../views/post", {
            title: post.title,
            author: post.author,
            content: post.content,
          });
        }
      }
    });
  } else {
    res.render("../views/login", { error: "" });
  }
};

router.get("/:postTitle", handlePost);

module.exports = router;
