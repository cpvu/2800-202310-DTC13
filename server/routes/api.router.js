import { Router } from "express";

export const apiRouter = () => {
    const router = Router(); 
    
    router.post("/login", postLogin); 

    return router;
}