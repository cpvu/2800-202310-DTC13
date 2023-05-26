import { Router } from "express";
import { postLogin, postSignup, postLogout, postSendResetPasswordEmail, postResetPassword, postCoinDescription, postAskQuestion, getWatchlist, postAddWatchlist, postRemoveWatchlist, postUpdateWatchlist, postArticleSentiment } from "../controllers/index.js";

export const apiRouter = () => {
    const router = Router();

    //Add routes here for API call
    router.post("/login", postLogin);
    router.post("/signup", postSignup);
    router.post("/logout", postLogout);
    router.post("/forgotPassword", postSendResetPasswordEmail);
    router.post("/resetPassword/:token", postResetPassword);

    // Chat GPT Model API Routes
    router.post("/coinDescription", postCoinDescription);
    router.post("/askQuestion", postAskQuestion);
    router.post("/generateArticleSentiment", postArticleSentiment);

    //Watch list API Routes
    router.get("/getWatchlist", getWatchlist);
    router.post("/addWatchlist", postAddWatchlist);
    router.post("/updateWatchlist", postUpdateWatchlist);
    router.post("/removeWatchlist", postRemoveWatchlist);

    return router;
}