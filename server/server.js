import bodyParser from "body-parser";
import express from "express";
import { apiRouter } from "./routes/api.router";
import * as dotenv from "dotenv";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import sessions from "express-sessions";

dotenv.config();

export const expressServer = () => {
    const app = express();

    try {
        mongoose.connect(process.env, {
            dbName: "CryptomentAI",
            keepAlive: true
        });

        app.use(json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors());

        app.use(sessions({
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

        //add root routes here and router
        app.use("/api", apiRouter());

        return app;

    } catch (err) {
        console.log(err);
    }
}