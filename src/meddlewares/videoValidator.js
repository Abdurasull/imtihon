import { serverConfig } from "../config.js"
import path from "path";
import { ClienError, globalError } from "../utils/error.js";
export const videoValidator = async (req, res, next) => {
    try{
        
        if(!serverConfig.video.videoFormat.includes(path.extname(req.files.video.name).toLowerCase())) throw new ClienError("Bunday fayl kingaytmali fayl yuklay olmaysiz", 400);
        if(req.files.video.size > serverConfig.video.size * 1024 * 1024) throw new ClienError("Kiritilgan file 50mb dan ko'p", 400);
        next();
        
    }catch(err){
        
        globalError(err, res);
    }
} 
