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

export const postSignup = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  console.log(req.body)
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: `Please provide ${error.details[0].message}.` });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email: value.email }, { username: value.username }] });
    if (existingUser) {
      const message = existingUser.email === value.email ? `User with email ${value.email} already exists.` : `User with username ${value.username} already exists.`;
      return res.status(400).json({ error: message });
    }

    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    const user = new User({
      username: value.username,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
    });

    await user.save();

    req.session.user = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res.status(200).json({ message: "Signup successful." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error occurred during signup. Please try again." });
  }
};

export const postLogin = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  console.log(req.body)

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Please provide ${error.details[0].message}.`, authenticated: false });
  }

  try {
    const user = await User.findOne({ username: value.username });
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with username ${value.username}.` });
    }
    const match = await bcrypt.compare(value.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password.", authenticated: false });
    }
    req.session.user = {
      _id: user._id,
      username: user.username,
    };
    res.status(200).json({ message: "Login successful.", authenticated: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during login." });
  }
};

export const postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.clearCookie("connect.sid").json({ message: "Logout successful" });
    }
  });
};

// Attempting to implement reset password functionality
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
});

export const postSendResetPasswordEmail = async (req, res) => {
  try {
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
      html: `<p>Dear ${existingUser.username},</p><p>Please click the following link to reset your password: <a href="https://localhost:8000/resetPassword/${resetToken}">Reset Password</a></p>`,
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


export const postChangePassword = async (req, res) => {
  const schema = Joi.object({
    newPassword: Joi.string().required(),
  });

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



