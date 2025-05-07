import { serverConfig } from "../config.js";
import { jwtToken } from "../lib/jwt.js";
import { globalError } from "../utils/error.js";
import { filenames } from "../utils/finename.js";
import moment from "moment";

export const uploadController = {
    ADDVIDEO: async (req, res) => {
        try{
            const {userId} = req.params;
            const users = await req.readFile("users.json");
            const user = users.find(user => user.id == userId);
            const videos = await req.readFile("videos.json");
            const videoId = videos.length ? videos.at(-1).id + 1 : 1;
            const newVideo = {
                id: videoId,
                userId: req.params.userId,
                createdAt: moment().format('YYYY:MM:DD HH:mm'),
                title: req.body.title,
                name: filenames(req),
                size: Math.round(req.files.video.size / 1024 / 1024),
                filePath: "videos/" + filenames(req),
                owner: req.body.owner,
                ownerImage: user.avatar

            }
            req.files.video.mv(serverConfig.filePathVideo(filenames(req)));
            
            videos.push(newVideo);
            await req.writeFile("videos.json", videos);
            res.status(201).json({...newVideo, status: 201});
        } catch(err) {
            globalError(err, res);
        }
    },
    DELETEVIDEO: async (req,res) => {
        try{
            const {userId} = req.params;
            const videos = await req.readFile("videos.json");
            const ownVideos = videos.filter(video => video.id != userId);
            const newVideos = ownVideos.filter(video => video.id !== req.body.id);
            await req.writeFile("videos.json", newVideos);
            req.status(200).json({message: "Video o`chirildi", status: 200})
    }catch(err){
        globalError(err, res);
    }},
    GETVIDEO: async (req, res) => {
        try{            
            const videos = await req.readFile("videos.json");
            const otherId = req.params.userId;
            const otherVideos = videos.filter(video => video.userId == otherId);

            res.status(200).json({videos: otherVideos, status: 200, message: "hammasi keldi"});
            
            
            
        }catch(err){
            globalError(err, res);
        }
    }
}