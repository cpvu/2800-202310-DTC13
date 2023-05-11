import { User } from "../models/authSchema.js";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

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

export const forgot_password = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  try {
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with email ${value.email}.` });
    }
    const payload = {
      email: user.email,
      id: user.id,
    }
    const token = jwt.sign(payload)
    const link = `http:localhost:8000/api/reset-password/${user.id}/${token}`;
    console.log(link);
    res.send(`Password reset link has been sent to ur email.
              ${link}`)


              
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred during login." });
  }
}

export const reset_password = async (req, res) => {
  const { id, token, email } = req.params;
    const user = await User.findOne({ email: value.email });
    const { password, password2 } = req.body;
    
    if (id !== user.id) {
        res.send('Invalid id...')
    }
    const secret = JWT_SECRET + user.password
    try {
        const payload = jwt.verify(token ,secret)
        await User.updateOne({ username: req.params.email }, { $set: { password: password } })
        a
        res.send(user) 

    } catch (error) {
        console.log(error.message);
        res.send(error.message);

    }
}

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

export const forget_password = (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:8000/api/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) { }
};
