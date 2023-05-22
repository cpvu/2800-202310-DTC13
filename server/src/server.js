import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/api.router.js";
import * as dotenv from "dotenv";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";

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
    app.use(cors({ origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN_PROD : process.env.ORIGIN_DEV, credentials: true}));
    app.use(cookieParser());

    app.use(
      session({
        secret: "secret",
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: 7200000, secure: false },
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
