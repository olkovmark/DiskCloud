import fs from "fs";
import File from "../models/File.js";
import c from "config";

class FileService {
  createDir(file) {
    return new Promise((resolve, reject) => {
      const filePath = `${c.get("filesPath")}/${file.user}/${file.path}`;
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was Created" });
        } else {
          console.log("reject");
          return reject({ message: "File already exit" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }
}

export default new FileService();
