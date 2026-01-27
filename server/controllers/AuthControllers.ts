import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// ================= REGISTER =================
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // check user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // session set (IMPORTANT: string store)
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id.toString();

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // session set
    req.session.isLoggedIn = true;
    req.session.userId = user._id.toString();

    return res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// ================= LOGOUT =================
export const logoutUser = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("thumblify.sid");
    return res.json({ message: "Logout successful" });
  });
};

// ================= VERIFY =================
export const verifyUser = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.session.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    return res.json({ user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
