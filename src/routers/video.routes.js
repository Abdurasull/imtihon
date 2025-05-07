import express from "express";
import { videoValidator } from "../meddlewares/videoValidator.js";
import { uploadController} from "../controller/upload.Controller.js";
import { jwtValidator } from "../meddlewares/jwtValitator.js";

export const videoRouter = express.Router();
videoRouter.post("/video/:userId", jwtValidator, videoValidator, uploadController.ADDVIDEO);
videoRouter.delete("/video/:userId", jwtValidator, uploadController.DELETEVIDEO);
videoRouter.get("/video/:userId", jwtValidator, uploadController.GETVIDEO);
 

