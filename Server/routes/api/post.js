const express = require("express");
const { verifyToken } = require("../../utils/verifyUser");
const { createPostController } = require("../../controllers/postController");

const router = express.Router();

router.post("/create", verifyToken, createPostController);

module.exports = router;
