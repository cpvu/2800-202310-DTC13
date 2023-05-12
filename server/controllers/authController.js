import { User } from "../models/authSchema.js";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import Joi from "joi";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
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

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Please provide ${error.details[0].message}.` });
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
      return res.status(401).json({ message: "Incorrect password." });
    }
    req.session.user = {
      _id: user._id,
      username: user.username,
    };
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during login." });
  }
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
    const existingUser = await User.findOne({ email: value.email });
    if (!existingUser) {
      return res.status(404).json({ message: `No user with email ${value.email}.` });
    }
    const email = existingUser.email;
    const username = existingUser.username;

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred password reset." });
  }

  const mailOptions = {
    from: 'cryptomentaihelp@gmail.com',
    to: '<user email>',
    subject: 'Password Reset',
    html: `<p>Dear ${username},</p><p>Please click the following link to reset your password: <a href="https://localhost/changePassword">Reset Password</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}


