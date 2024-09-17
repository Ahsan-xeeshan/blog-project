const express = require("express");
const {
  updateUserController,
  deleteUserController,
  signOutController,
  getAllUsersController,
} = require("../../controllers/userController");
const { verifyToken } = require("../../utils/verifyUser");
const router = express.Router();

router.put("/update/:userId", verifyToken, updateUserController);
router.delete("/delete/:userId", verifyToken, deleteUserController);
router.post("/signout", signOutController);
router.get("/getusers", verifyToken, getAllUsersController);

module.exports = router;
