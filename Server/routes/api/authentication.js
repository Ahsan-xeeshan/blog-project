const express = require("express");
const router = express.Router();

const {
  registrationController,
  signInController,
} = require("../../controllers/registrationController");

router.post("/registration", registrationController);
router.post("/signin", signInController);

module.exports = router;
