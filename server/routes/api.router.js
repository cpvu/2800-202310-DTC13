import { Router } from "express";
import { postLogin, postSignup, forgot_password } from "../controllers/authController.js";

export const apiRouter = () => {
    const router = Router(); 
    
    //Add routes here for API call
    router.post("/login", postLogin); 
    router.post("/signup", postSignup); 
    router.post("/forgot_password", forgot_password)
    

    return router;
}