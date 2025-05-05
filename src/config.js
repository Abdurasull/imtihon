import path from 'path';
import config from 'config';

export const serverConfig = {
    filePathVideo: (filename) => path.join(process.cwd(), 'uploads/videos', filename),
    filePathAvatars: (filename) => path.join(process.cwd(), 'uploads/avatars', filename),
    dbPath: (filename) => path.join(process.cwd(), 'db', filename),
    PORT: config.get("PORT"),
    TOKIN_KEY: config.get("TOKIN_KEY"),
    avatar: {
        avatarFormat: [".png", ".jpg", ".jpeg"],
        size: 5
    },
    video: {
        videoFormat: [".mp4", ".mov"],
        size: 50
    }

}