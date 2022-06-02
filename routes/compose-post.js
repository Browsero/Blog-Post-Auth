const express = require("express");
const Post = require("../models/post");
const router = express.Router();

const handleComposePost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user.username,
  });
  try {
    await post.save();
    res.redirect("/blog");
  } catch (err) {
    console.error(err);
  }
};

const handleCompose = (req, res) => {
  res.render("../views/compose");
};

router.get("/", handleCompose).post("/", handleComposePost);

module.exports = router;
