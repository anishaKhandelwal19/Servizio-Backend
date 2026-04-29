import { Schema, model } from "mongoose";

const locationSchema = new Schema({
    address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
});

export default model("Location", locationSchema);
