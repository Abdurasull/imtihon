import pkg from "jsonwebtoken";
import { serverConfig } from '../config.js';
const {TOKIN_KEY} = serverConfig;
const {sign, verify} = pkg;


export const jwtToken = {
    createToken: (payload) => sign(payload, TOKIN_KEY),
    verifyToken: (token) => verify(token, TOKIN_KEY)
}