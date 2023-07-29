import express from "express";
import userController from "../controller/user-controller.js";
import { verifyToken } from "../middleware/verify-token.js";

const userRouter = new express.Router();

userRouter.post('/api/users', userController.register);
userRouter.post('/api/users/login', userController.login);
userRouter.post('/api/users/refresh-token', userController.refreshToken);

userRouter.use(verifyToken);
userRouter.get('/api/users/profile', userController.profile);
userRouter.delete('/api/users/logout', userController.logout);

export {
    userRouter
}