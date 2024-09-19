const express = require("express");
const {
  createCommentController,
  getAllCommentsController,
} = require("../../controllers/commentcontroller");
const { verifyToken } = require("../../utils/verifyUser");
const router = express.Router();

router.post("/create-comment", verifyToken, createCommentController);
router.get("/get-all-comments/:postId", getAllCommentsController);

module.exports = router;
