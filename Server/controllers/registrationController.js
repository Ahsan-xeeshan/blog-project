const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

async function registrationController(req, res) {
  let emailInput = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  let passwordInput =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const { username, email, password } = req.body;

  if (!username) {
    return res.json({ error: "Name is required" });
  }
  if (!email) {
    return res.json({ error: "Email is required" });
  } else if (!emailInput.test(email)) {
    return res.json({ error: "Name is Invalid" });
  }

  if (!password) {
    return res.json({ error: "Password is required" });
  } else {
    if (!passwordInput.test(password)) {
      return res.json({
        error:
          "#Password should be between 8 to 15 characters which contain at least one lowercase letter[a-z], one uppercase letter[A-Z], one numeric digit[0-9], and one special character[!,@,#,$,%,^,&,*]",
      });
    }
  }
  const existingEmail = await userSchema.find({ email });

  if (existingEmail.length > 0) {
    res.json({ error: "This email is already used" });
  }

  bcrypt.hash(password, 10, function (err, hash) {
    const users = new userSchema({
      username,
      email,
      password: hash,
    });
    users.save();
    res.send({
      success: "Registration Successfully done.",
    });
  });
}

module.exports = {
  registrationController,
};
