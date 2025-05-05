import { serverConfig } from "../config.js";
import { globalError } from "../utils/error.js";
import { filenames } from "../utils/finename.js";

export const uploadController = {
    VIDEO: async (req, res) => {
        try{
            
            const videos = await req.readFile("videos.json");
            const videoId = videos.length ? videos.at(-1).id + 1 : 1;
            const newVideo = {
                id: videoId,
                userId: req.body.userId,
                title: req.body.title,
                name: filenames(req),
                size: req.files.video.size,
                filePath: serverConfig.filePathVideo(filenames(req))
            }
            req.files.video.mv(newVideo.filePath);
            videos.push(newVideo);
            await req.writeFile("videos.json", videos);
            res.status(201).json(newVideo);
        } catch(err) {
            globalError(err, res);
        }
    }
}