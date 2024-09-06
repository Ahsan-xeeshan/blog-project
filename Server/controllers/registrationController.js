const userSchema = require("../models/userSchema");
async function registrationController(req, res) {
  try {
    const { username, email, password } = req.body;
    const userData = new userSchema({
      username,
      email,
      password,
    });
    await userData.save();

    res.status(201).json({ success: "Registration successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  registrationController,
};
