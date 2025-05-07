import express from "express";
import { viewscontroller } from "../controller/views.controller.js";

export const viewsRouter = express.Router();

viewsRouter.get("/index/:userId",  viewscontroller.MAIN);
viewsRouter.get("/upload/:userId", viewscontroller.USER_PAGE);
viewsRouter.get("/login", viewscontroller.LOGIN);
viewsRouter.get("/register", viewscontroller.REGISTER);