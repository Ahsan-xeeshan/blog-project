const express = require("express");
const { updateUserController } = require("../../controllers/userController");
const { verifyToken } = require("../../utils/verifyUser");
const router = express.Router();

router.put("/update/:userId", verifyToken, updateUserController);

module.exports = router;
