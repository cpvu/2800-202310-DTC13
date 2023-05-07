import bodyParser from "body-parser";
import express from "express"; 
import { apiRouter } from "./routes/api.router";

export const expressServer = () => {
    const app = express();

    //mongo

    app.use(json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json()); 

    app.use("/api", apiRouter()); 

    return app;
}