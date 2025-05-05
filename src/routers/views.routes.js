import express from "express";
import { viewscontroller } from "../controller/views.controller.js";

export const viewsRouter = express.Router();

viewsRouter.get("/",  viewscontroller.MAIN);
viewsRouter.get("/userPage/:userId", viewscontroller.USER_PAGE);
viewsRouter.get("/login", viewscontroller.LOGIN);
viewsRouter.get("/index/:userId", viewscontroller.ACTIVE_TODOS);
viewsRouter.get("/noActiveTodos/:userId", viewscontroller.NO_ACTIVE_TODOS);



