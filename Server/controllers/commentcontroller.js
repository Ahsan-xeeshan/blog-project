const commentSchema = require("../models/commentSchema");

const createCommentController = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        res
          .status(403)
          .json({ error: "You are not allowed to create this comment." })
      );
    }
    const newComment = new commentSchema({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

const getAllCommentsController = async (req, res, next) => {
  try {
    const comments = await commentSchema
      .find({ postId: req.params.postId })
      .sort({
        createdAt: -1,
      });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCommentController,
  getAllCommentsController,
};
