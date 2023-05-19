import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/api.router.js";
import * as dotenv from "dotenv";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import session from "express-session";

dotenv.config();

export let expressServer = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      dbName: "CryptomentAI",
      useUnifiedTopology: true, // Added option for unified topology
      useNewUrlParser: true, // Added option for new URL parser
    });

    console.log("Mongoose connected")
    
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use(
      session({
        secret: "secret",
        saveUninitialized: true,
        authenticated: Boolean,
        username: String,
        cookie: { maxAge: 0 },
        resave: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URL,
        }),
      })
    );

    app.use("/api", apiRouter());

    return app;

  } catch (e) {
    console.log(e)
  }
}

export const checkSession = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};