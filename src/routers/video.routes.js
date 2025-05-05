import express from "express";
import { videoValidator } from "../meddlewares/videoValidator.js";
import { uploadController} from "../controller/upload.Controller.js";

export const videoRouter = express.Router();
// console.log("Salom");
videoRouter.post("/video", videoValidator, uploadController.VIDEO );

