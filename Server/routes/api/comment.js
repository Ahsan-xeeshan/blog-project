const express = require("express");
const {
  createCommentController,
  getAllCommentsController,
  likeCommentController,
  editCommentController,
} = require("../../controllers/commentcontroller");
const { verifyToken } = require("../../utils/verifyUser");
const router = express.Router();

router.post("/create-comment", verifyToken, createCommentController);
router.get("/get-all-comments/:postId", getAllCommentsController);
router.put("/like-comment/:commentId", verifyToken, likeCommentController);
router.put("/edit-comment/:commentId", verifyToken, editCommentController);

module.exports = router;
