import { readFile } from "fs";
import fs from "fs/promises";
import { serverConfig } from "../config.js";
const {dbPath} = serverConfig
export const model = async (req, res, next) => {
    req.readFile = async (filename) => {
        const data = await fs.readFile(dbPath(filename), "utf-8");
        return data ? JSON.parse(data) : [];

    }

    req.writeFile = async (filename, data) => {
        fs.writeFile(dbPath(filename), JSON.stringify(data, null, 4));
        return true;
    }
    next();
}