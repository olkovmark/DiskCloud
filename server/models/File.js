import { model, Schema } from "mongoose";

const File = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  accessLink: { type: String },
  path: { type: String, default: "" },
  size: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  parent: { type: Schema.Types.ObjectId, ref: "File" },
  childs: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

export default model("File", File);
