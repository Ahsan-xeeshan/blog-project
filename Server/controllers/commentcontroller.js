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

const likeCommentController = async (req, res, next) => {
  try {
    const comment = await commentSchema.findById(req.params.commentId);
    if (!comment) {
      return next(res.status(404).json({ error: "Comment not found" }));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCommentController,
  getAllCommentsController,
  likeCommentController,
};
