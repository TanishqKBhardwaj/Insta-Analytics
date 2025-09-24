import User from "../models/User.js";
import "dotenv/config"
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User with this email already exists" });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password // will be hashed automatically by pre('save') hook
    });

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, influencer: newUser.influencer },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set JWT cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7*24 * 60 * 60 * 1000, // 1 week
    });

    // Respond with user info
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        influencer: newUser.influencer,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error, could not register user",
    });
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate("influencer");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT (valid for 7 days)
    const token = jwt.sign(
      { id: user._id, influencer: user.influencer},
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // matches cookie maxAge
    );

    // Set JWT in HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    // Respond with user info (without password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        influencer: user.influencer,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error, could not log in",
    });
  }
};


export const signOut = (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    console.error("Error in signOutUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error, could not sign out",
    });
  }
};
