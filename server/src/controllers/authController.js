import { User } from "../models/authSchema.js";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import Joi from "joi";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const saltRounds = 12;

//Sign up route logic
export const postSignup = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  //Validate request body with Joi Schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, messsage: `Please provide ${error.details[0].message}.` });
  }

  try {
  
    const existingUser = await User.findOne({ $or: [{ email: value.email }, { username: value.username }] });

    // Check if user exists in database
    if (existingUser) {
      const message = existingUser.email === value.email ? `User with email ${value.email} already exists.` : `User with username ${value.username} already exists.`;
      return res.status(400).json({ success: false, message: message });
    }

    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    //Create new user into database
    const user = new User({
      username: value.username,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({ success: true, message: "Signup successful." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error occurred during signup. Please try again." });
  }
};

//Login route logic
export const postLogin = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  //Validate request body with Joi Schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Please provide ${error.details[0].message}.`, authenticated: false });
  }

  try {
    //Find if user exists in database
    const user = await User.findOne({ username: value.username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with username ${value.username}.` });
    }
    
    //Check if hashed password matches request payload password
    const match = await bcrypt.compare(value.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password.", authenticated: false });
    }

    //Set user session
    req.session.user = {
      _id: user._id,
      username: user.username,
      authenticated: true
    };

    res.status(200).json({ message: "Login successful.", authenticated: true });
  } catch (error) {
    console.error(error);
  }
};

//Logout route logic
export const postLogout = (req, res) => {
  //Check if user is authenticated and has an existing session
  if (!req.session.user || !req.session.user.authenticated) {
    return res.status(500).json({ message: "Not authenticated" })
  }

  //Clear session and send appropriate response
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.clearCookie("connect.sid").json({ message: "Logout successful"});
    }
  });
};

//Password email reset route logic
export const postSendResetPasswordEmail = async (req, res) => {
  try {
    // Attempting to implement reset password functionality
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      }
    });

    const { email } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: `No user with email ${email}.` });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    existingUser.resetToken = resetToken;
    existingUser.resetTokenExpiration = Date.now() + 3600000;

    await existingUser.save();

    const mailOptions = {
      from: "cryptomentaihelp@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>Dear ${existingUser.username},</p><p>Please click the following link to reset your password: <a href="http://localhost:3000/reset/password/${resetToken}">Reset Password</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).json({ message: "Error occurred while sending password reset email." });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Password reset email sent successfully." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during password reset." });
  }
};

//Password reset/change route logic
export const postResetPassword = async (req, res) => {
  const schema = Joi.object({
    newPassword: Joi.string().required(),
  });
  console.log(req.body)
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Please provide ${error.details[0].message}.` });
  }

  try {
    const user = await User.findOne({ resetToken: req.params.token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(value.newPassword, saltRounds);
    user.password = hashedPassword;
    user.resetToken = null;

    await user.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred during password change." });
  }
};



