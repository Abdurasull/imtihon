import express from 'express';
import fileUpload from 'express-fileupload';
import { mainRouter } from './routers/main.routes.js';
import config from 'config';
import { model } from './model/model.js';
import { viewsRouter } from './routers/views.routes.js';
import path from "path";
const PORT = config.get("PORT");


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.use(fileUpload());

app.use(model);

app.use("/api", mainRouter);
app.use(viewsRouter)

// app.post(`/upload/avatar`, (req, res) => {
//     const filename = filenames(req)
//     req.files.video.mv(serverConfig.filePathVideo(filenames(filename)));
//     res.send(filename);

// })
    

app.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`);
});