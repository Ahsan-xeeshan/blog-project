const express = require("express");
const { verifyToken } = require("../../utils/verifyUser");
const {
  createPostController,
  getPostsController,
  deletePostController,
  updatePostController,
} = require("../../controllers/postController");

const router = express.Router();

router.post("/create", verifyToken, createPostController);
router.get("/getposts", getPostsController);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePostController);
router.put("/updatepost/:postId/:userId", verifyToken, updatePostController);

module.exports = router;
