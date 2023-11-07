const express = require("express");
const router = express.Router();

//controllers
const { createComment } = require("../controllers/commemts");
const { createPost } = require("../controllers/post");
const { getPosts, getPostById } = require("../controllers/post");

//mapping
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPostById);

//export
module.exports = router;

