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


