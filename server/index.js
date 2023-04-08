import mongoose from "mongoose";
import config from "config";
import express from "express";
import { router } from "./routes/auth.routes.js";
import User from "./models/User.js";
import cors from "./middleware/cors.middleware.js";

const app = express();
const port = config.get("PORT");
const monogDB = config.get("urlMongo");

app.use(cors);
app.use(express.json());
app.use("/api/auth", router);

async function start() {
  try {
    await mongoose.connect(monogDB);
    app.listen(port, () => {
      console.log("start server");
    });
  } catch (e) {
    console.log(e);
  }
}

export default start();
