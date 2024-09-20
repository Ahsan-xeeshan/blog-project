const express = require("express");
const {
  createCommentController,
  getAllCommentsController,
  likeCommentController,
  editCommentController,
  deleteCommentController,
  getCommentsController,
} = require("../../controllers/commentcontroller");
const { verifyToken } = require("../../utils/verifyUser");
const router = express.Router();

router.post("/create-comment", verifyToken, createCommentController);
router.get("/get-all-comments/:postId", getAllCommentsController);
router.put("/like-comment/:commentId", verifyToken, likeCommentController);
router.put("/edit-comment/:commentId", verifyToken, editCommentController);
router.delete(
  "/delete-comment/:commentId",
  verifyToken,
  deleteCommentController
);
router.get("/getcomments", verifyToken, getCommentsController);
module.exports = router;
