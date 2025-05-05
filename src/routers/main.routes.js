import express from "express";
import { videoRouter } from "./video.routes.js";
import { authRouter } from "./auth.routes.js";


export const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use('/upload', videoRouter);

