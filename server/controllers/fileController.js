import File from "../models/File.js";
import fs from "fs";
import User from "../models/User.js";
import fileServices from "../services/fileServices.js";
import c from "config";

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;

      const file = new File({ name, type, parent, user: req.user.id });

      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileServices.createDir(file);
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileServices.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });

      return res.json(files);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async fileUpload(req, res) {
    try {
      const file = req.files.file;
      const parent = await File.findOne({ _id: req.body.parent });
      const user = await User.findOne({ _id: req.user.id });

      if (file.size * user.usedSpace > user.diskSpace)
        return res.status(400).json({ message: "No space in the Disk" });

      let path;
      if (parent)
        path = `${c.get("filesPath")}/${user.id}/${parent.path}/${file.name}`;
      else path = `${c.get("filesPath")}/${user.id}/${file.name}`;
      console.log(path);

      if (fs.existsSync(path))
        return res.status(400).json({ message: "File already exist" });

      file.mv(path);

      const type = file.name.split(".").pop();
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      });
      user.usedSpace = user.usedSpace + file.size;
      await dbFile.save();
      await user.save();

      return res.status(200).json(dbFile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "File no upload" });
    }
  }
}
export default new FileController();
