import { Schema, model } from "mongoose";
const RefreshToken = new Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default model("RefreshToken", RefreshToken);
