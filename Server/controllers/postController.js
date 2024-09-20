const postSchema = require("../models/postSchema");

const createPostController = async (req, res, next) => {
  if (!req.user) {
    return next(
      res.status(403).json({ error: "You are not allowed to create a post." })
    );
  }
  if (!req.body.title || !req.body.content) {
    return next(
      res.status(403).json({ error: "Please, provide all require fields" })
    );
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new postSchema({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};

const getPostsController = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await postSchema
      .find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await postSchema.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await postSchema.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

const deletePostController = async (req, res, next) => {
  if (!req.user || req.user.id !== req.params.userId) {
    return next(
      res
        .status(403)
        .json({ error: "You are not allowed to delete this post." })
    );
  }
  try {
    await postSchema.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted.");
  } catch (error) {
    next(error);
  }
};

const updatePostController = async (req, res, next) => {
  if (!req.user || req.user.id !== req.params.userId) {
    return next(
      res
        .status(403)
        .json({ error: "You are not allowed to update this post." })
    );
  }
  try {
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");
    const updatedPost = await postSchema.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          slug,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPostController,
  getPostsController,
  deletePostController,
  updatePostController,
};
