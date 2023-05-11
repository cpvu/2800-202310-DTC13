import { User } from "../models/authSchema.js";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import Joi from "joi";

const saltRounds = 12;

export const postLogin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Please provide ${error.details[0].message}.` });
  }

  try {
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with email ${value.email}.` });
    }
    const match = await bcrypt.compare(value.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    req.session.user = {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    };
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during login." });
  }
};

export const postSignup = async (req, res) => {
  const schema = Joi.object({
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
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with email ${value.email} already exists.` });
    }

    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    const user = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: hashedPassword,
    });

    await user.save();

    req.session.user = {
      _id: user._id,
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

// // Assuming you have already installed the 'nodemailer' package
// const nodemailer = require('nodemailer');

// // Sample user data
// // const users = [];
 
// // Function to reset password
// function resetPassword(username) {
//   // Find the user with the provided 
//   const user = users.find(user => user.email === lastname);

//   if (user) {
//     // Generate a new password (you can use any method to generate a new password)
//     const newPassword = generateNewPassword();

//     // Update the user's password
//     user.password = newPassword;

//     // Send the new password to the user
//     sendNewPassword(user, newPassword);

//     console.log('Password reset successful. Check your email for the new password.');
//   } else {
//     console.log('User not found. Please enter a valid username.');
//   }
// }

// // Function to generate a new password
// function generateNewPassword() {
//   // Generate a random password here (you can use any method to generate a random password)
//   const newPassword = 'newPassword123';
//   return newPassword;
// }

// // Function to send the new password to the user via email
// function sendNewPassword(user, newPassword) {
//   // Create a nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'email_service', // Replace with your email service provider
//     auth: {
//       user: 'email_address',
//       pass: 'email_password'
//     }
//   });

//   // Email options
//   const mailOptions = {
//     from: 'your_email_address',
//     to: user.email,
//     subject: 'Password Reset',
//     text: `Your new password is: ${newPassword}`
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }

// // Usage example
// const username = prompt('Enter your username:');
// resetPassword(username);
