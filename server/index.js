import mongoose from "mongoose";
import config from "config";
import express from "express";
import autRouter from "./routes/auth.routes.js";

const app = express();
const port = config.get("PORT");
const monogDB = config.get("urlMongo");
console.log("message")

app.use(express.json());
app.use("/api/auth", autRouter);

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
