import { Router } from "express";
import { postLogin, postSignup } from "../controllers/authController.js";

export const apiRouter = () => {
    const router = Router(); 
    
    //Add routes here for API call
    router.post("/login", postLogin); 
    router.post("/signup", postSignup); 

    return router;
}