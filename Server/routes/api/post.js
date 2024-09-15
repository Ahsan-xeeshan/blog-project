const express = require("express");
const { verifyToken } = require("../../utils/verifyUser");
const {
  createPostController,
  getPostsController,
} = require("../../controllers/postController");

const router = express.Router();

router.post("/create", verifyToken, createPostController);
router.get("/getposts", getPostsController);

module.exports = router;
