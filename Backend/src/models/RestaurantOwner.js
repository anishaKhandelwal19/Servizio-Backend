import { Schema, model } from "mongoose";

const ownerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

export default model("RestaurantOwner", ownerSchema);
