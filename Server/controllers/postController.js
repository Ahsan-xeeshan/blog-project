const postSchema = require("../models/postSchema");

const createPostController = async (req, res, next) => {
  console.log(req.user.isAdmin);
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
module.exports = {
  createPostController,
};
