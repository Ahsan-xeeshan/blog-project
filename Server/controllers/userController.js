const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");

const updateUserController = async (req, res, next) => {
  console.log(req.user.id);
  if (req.user.id !== req.params.userId) {
    return next(
      res.status(403).json({ error: "You are not allowed to update this user" })
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(
        res
          .status(400)
          .json({ error: "Password must be at least 8 characters." })
      );
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        res
          .status(400)
          .json({ error: "Username must be between 7 and 20 characters." })
      );
    }
    if (req.body.username.includes(" ")) {
      return next(
        res.status(400).json({ error: "Username can not contain spaces." })
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(
        res.status(400).json({ error: "Username must be lowercase" })
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        res
          .status(400)
          .json({ error: "Username can only contain letters and numbers" })
      );
    }
  }
  try {
    // Ensure that req.params.userId exists (it's 'params' instead of 'param')
    const userId = req.params.userId;

    // Find the user by ID and update the specified fields
    const updateUser = await userSchema.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true } // Ensure the updated document is returned
    );

    // Check if the user was found and updated
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Destructure the password out of the updated user object and send the rest
    const { password, ...rest } = updateUser._doc; // _doc contains the document data
    res.status(200).json(rest);
  } catch (error) {
    // Handle any errors that might occur
    next(error); // Pass the error to the error-handling middleware
  }
};

const deleteUserController = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      res.status(403).json({ error: "You are not allowed to delete this user" })
    );
  }
  try {
    await userSchema.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

const signOutController = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been sign out");
  } catch (error) {
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  if (!req.user) {
    return next(
      res.status(403).json({ error: "You are not allowed to see all users." })
    );
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await userSchema
      .find()
      .sort({ createAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await userSchema.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await userSchema.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserController,
  deleteUserController,
  signOutController,
  getAllUsersController,
};
