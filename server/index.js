import mongoose from "mongoose";
import config from "config";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import filehRouter from "./routes/file.routes.js";
import cors from "./middleware/cors.middleware.js";
import fileUpload from "express-fileupload";

const app = express();
const port = config.get("PORT");
const monogDB = config.get("urlMongo");

app.use(fileUpload({}));
app.use(cors);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", filehRouter);

async function start() {
  try {
    await mongoose.connect(monogDB);
    app.listen(port, () => {
      console.log("start server:");
    });
  } catch (e) {
    console.log(e);
  }
}

export default start();
