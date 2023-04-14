import File from "../models/File.js";
import fs from "fs";
import User from "../models/User.js";
import fileServices from "../services/fileServices.js";
import c from "config";
import { ok } from "assert";

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
    console.log("--------");
    console.log(req.files.file);
    try {
      const file = req.files.file;
      const parent = await File.findOne({ _id: req.body.parent });
      const user = await User.findOne({ _id: req.user.id });

      if (file.size + user.usedSpace > user.diskSpace)
        return res.status(400).json({ message: "No space in the Disk" });

      let path;
      if (parent)
        path = `${c.get("filesPath")}${user.id}/${parent.path}/${file.name}`;
      else path = `${c.get("filesPath")}${user.id}/${file.name}`;

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
      if (parent) {
        parent.childs.push(dbFile._id);
        await parent.save();
      }

      await dbFile.save();
      await user.save();

      return res.status(200).json(dbFile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "File no upload" });
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      if (!file)
        return res.status(500).json({ message: "File in base not Found" });

      const path = `${c.get("filesPath")}${req.user.id}/${file.path}/${
        file.type === "dir" ? "" : file.name
      }`;

      if (fs.existsSync(path)) return res.download(path, file.name);

      return res.status(500).json({ message: "Download error" });
    } catch (error) {
      res.status(500).json({ message: "Download errors" });
    }
  }

  async deleteFile(req, res) {
    const file = await File.findOne({ _id: req.query.id, user: req.user.id });
    const stack = [file._id];

    stack.push();

    const childs = await findChilds(file, stack);
    console.log("!!!!!!!");
    // console.log("final", stack);

    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      if (!file)
        return res.status(500).json({ message: "File in base not Found" });

      const path =
        c.get("filesPath") +
        req.user.id +
        (file.path ? "/" + file.path : "") +
        (file.type !== "dir" ? "/" + file.name : "");

      if (fs.existsSync(path)) {
        if (file.type === "dir") {
          const t = await File.deleteMany({
            _id: stack,
            user: req.user.id,
          });
          console.log(t);

          fs.rmdirSync(path, { recursive: true, force: true });

          return res.status(200).json();
        }

        fs.unlinkSync(path);
        const r = await File.deleteOne({
          _id: req.query.id,
          user: req.user.id,
        });

        return res.status(200).json(r);
      }

      return res.status(500).json({ message: "Delete error" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Delete errors" });
    }
  }
}
export default new FileController();

async function findChilds(file, stackId) {
  for (const item of file.childs) {
    stackId.push(item);
    const t = await File.findOne({ _id: item });
    if (t?.childs.length > 0) await findChilds(t, stackId);
  }
}
