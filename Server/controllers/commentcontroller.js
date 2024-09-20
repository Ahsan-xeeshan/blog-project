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

const editCommentController = async (req, res, next) => {
  try {
    const comment = await commentSchema.findById(req.params.commentId);

    if (!comment) {
      return next(res.status(404).json({ error: "Comment not found" }));
    }
    if (comment.userId !== req.user.id && !req.user) {
      if (!comment) {
        return next(
          res
            .status(403)
            .json({ error: "You are not allowed to edit this comment" })
        );
      }
    }
    const editedComment = await commentSchema.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    const comment = await commentSchema.findById(req.params.commentId);
    if (!comment) {
      return next(res.status(404).json({ error: "Comment not found" }));
    }
    if (comment.userId !== req.user.id && !req.user) {
      return next(
        res
          .status(403)
          .json({ error: "You are not allowed to delete this comment" })
      );
    }
    await commentSchema.findByIdAndDelete(req.params.commentId);
    res.status(200).json(`Comment has been deleted`);
  } catch (error) {
    next(error);
  }
};

const getCommentsController = async (req, res, next) => {
  if (!req.user) {
    return next(
      res
        .status(403)
        .json({ error: "You are not allowed to get all comments." })
    );
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await commentSchema
      .find()
      .sort({ createAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await commentSchema.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await commentSchema.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCommentController,
  getAllCommentsController,
  likeCommentController,
  editCommentController,
  deleteCommentController,
  getCommentsController,
};
