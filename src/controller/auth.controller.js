import { serverConfig } from "../config.js";
import { jwtToken } from "../lib/jwt.js";
import { globalError } from "../utils/error.js";
import sha256 from "sha256";
import { avatarfilenames } from "../utils/finename.js";

export const authController = {
    "register": async (req, res) => {
        try{   
            // fotoni faylga joylash uchun
            req.files.image.mv(serverConfig.filePathAvatars(avatarfilenames(req)));

            const users = await req.readFile("users.json");
            const id = users.length ? users.at(-1).id + 1 : 1 ;
            const newUser = {
                id: id,
                name: req.body.name,
                email: req.body.email,
                password: sha256(req.body.password),
                avatar: serverConfig.filePathAvatars(avatarfilenames(req))
            };
            users.push(newUser);
            await req.writeFile("users.json", users);
            
            const token = jwtToken.createToken({id: newUser.id, email: newUser.email});
            console.log(newUser);
            
            res.status(201).json(
            {
                message: "User created successfully",
                status: 201,
                token: token,
                userInfo: {
                    userId: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                }
            }
            );
        }catch(err){
            globalError(err, res);
        }
    },
    "login": async (req, res) => {
        try{
            const {email, password} = req.body;
            const users = await req.readFile("users.json");
            const user = users.find(user => user.email === email && user.password === sha256(password));
            
            const token = jwtToken.createToken({id: user.id, email: user.email});
            res.status(200).json({
                message: "User logged in successfully",
                status: 200,
                token: token,
                userInfo: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
            }});
        }catch(err){
            globalError(err, res);
        }   
    }
}