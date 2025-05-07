import { jwtToken } from "../lib/jwt.js"
import { globalError } from "../utils/error.js";

export const jwtValidator =async (req, res, next) => {
    try{        
        const token = req.headers.authorization.split(' ')[1];
        jwtToken.verifyToken(token);
        next();
    }catch(err){
        globalError(err, res);
    }
}