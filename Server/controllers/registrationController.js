const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

async function registrationController(req, res, next) {
  try {
    let emailInput = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let passwordInput =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const { username, email, password } = req.body;

    // Check if username is provided
    if (!username) {
      return res.json({ error: "Name is required" });
    }

    // Check if email is provided and valid
    if (!email) {
      return res.json({ error: "Email is required" });
    } else if (!emailInput.test(email)) {
      return res.json({ error: "Email is invalid" });
    }

    // Check if password is provided and valid
    if (!password) {
      return res.json({ error: "Password is required" });
    } else if (!passwordInput.test(password)) {
      return res.json({
        error:
          "Password should be between 8 to 15 characters which contain at least one lowercase letter[a-z], one uppercase letter[A-Z], one numeric digit[0-9], and one special character[!,@,#,$,%,^,&,*]",
      });
    }

    // Check if the email is already in use
    const existingEmail = await userSchema.find({ email });
    if (existingEmail.length > 0) {
      return res.json({ error: "This email is already used" });
    }

    // Hash the password and save the user
    const hash = await bcrypt.hash(password, 10);
    const user = new userSchema({
      username,
      email,
      password: hash,
    });

    await user.save();
    return res.json({
      success: "Registration successfully done.",
    });
  } catch (error) {
    // Catch and return any errors that occur during the process
    next(error);
  }
}

module.exports = {
  registrationController,
};
