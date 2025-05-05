import express from "express";
import { authValidatLogin, authValidatRegister } from "../meddlewares/authValidator.js";
import { authController } from "../controller/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", authValidatRegister, authController.register);
authRouter.post("/login", authValidatLogin, authController.login);