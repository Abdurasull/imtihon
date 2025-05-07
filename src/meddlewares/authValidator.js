import { serverConfig } from "../config.js";
import { ClienError, globalError  } from "../utils/error.js";
import { registerSchema } from "./JOI.js";
import sha256 from "sha256";
import path from "path";
import { jwtToken } from "../lib/jwt.js";

export const authValidatRegister = async (req, res, next) => {
    try{
        const file = req.files;

        
        if(!serverConfig.avatar.avatarFormat.includes(path.extname(req.files.image.name).toLowerCase())) throw new ClienError("Bunday fayl kingaytmali fayl yuklay olmaysiz", 400);
        if(req.files.image.size > serverConfig.avatar.size * 1024 * 1024) throw new ClienError("Kiritilgan file 5mb dan ko'p", 400);
        
        const {email, password} = req.body;
            
        const checkJoi = registerSchema({email, password});
        if(checkJoi) throw new ClienError(checkJoi, 400);
        
        const users = await req.readFile("users.json");
        const isUser = users.some(user => user.email === email);
    
        if(isUser) throw new ClienError("Bunday foydalanuvchi ro`yxatdan o`tgan", 400);
    
        next();
    }catch(err){
        globalError(err, res);
    }
    
}

export const authValidatLogin = async (req, res, next) => {
    try{  
        
        const {email, password} = req.body;
        const users = await req.readFile("users.json");
        const isUser = users.some(user => (user.email === email) && (user.password === sha256(password)));
        if(!isUser) throw new ClienError("Email yoki parol xato", 400);
        next();

    }catch(err){
        globalError(err, res);
    }

}