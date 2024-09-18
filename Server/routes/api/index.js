const express = require("express");
const router = express.Router();

const authRouter = require("./authentication");
const userRouter = require("./user");
const postRouter = require("./post");
const commentRouter = require("./comment");

router.use("/authentication", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

module.exports = router;
