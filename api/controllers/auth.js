import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// REGISTER FUNCTION
export const register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

// LOGIN FUNCTION
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    // ✅ Deployment-safe cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,        // ✅ Ensures cookie only sent over HTTPS (Render = HTTPS)
        sameSite: "None",    // ✅ Allows cross-site cookie (frontend & backend are on different domains)
      })
      .status(200)
      .json({ ...otherDetails });

  } catch (err) {
    next(err);
  }
};
