import { Router } from "express";
import { postLogin, postSignup, postLogout, postSendResetPasswordEmail, postChangePassword } from "../controllers/authController.js";

export const apiRouter = () => {
    const router = Router();

    //Add routes here for API call
    router.post("/login", postLogin);
    router.post("/signup", postSignup);
    router.post("/logout", postLogout);
    router.post("/forgotPassword", postSendResetPasswordEmail);
    router.post("/resetPassword/:token", postChangePassword);


    return router;
}