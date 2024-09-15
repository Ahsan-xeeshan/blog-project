const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

async function signInController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ error: "Email is required" });
    } else if (!password) {
      return res.json({ error: "Password is required" });
    } else {
      const existingEmail = await userSchema.findOne({ email });

      if (existingEmail) {
        const passwordMatch = await bcrypt.compareSync(
          password,
          existingEmail.password
        );

        if (!passwordMatch) {
          return res.json({ error: "Password does not match" });
        }
        const token = jwt.sign(
          { id: existingEmail._id, isAdmin: existingEmail.isAdmin },
          process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = existingEmail._doc;

        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json({ success: "Sign in successfull", rest });
      } else {
        return res.json({ error: "User not found" });
      }
    }
  } catch (error) {
    console.error("Error in signInController:", error);
    next(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function googleAuthController(req, res, next) {
  const { name, email, googlePhotoURL } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(token);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new userSchema({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registrationController,
  signInController,
  googleAuthController,
};
