const express = require("express");
const router = express.Router();

const {
  registrationController,
  signInController,
  googleAuthController,
} = require("../../controllers/registrationController");

router.post("/registration", registrationController);
router.post("/signin", signInController);
router.post("/google", googleAuthController);

module.exports = router;
