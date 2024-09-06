const express = require("express");
const router = express.Router();

const authRouter = require("./authentication");

router.use("/authentication", authRouter);

module.exports = router;
