import { Schema, model } from "mongoose";

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // URL or file path to the profile picture
      default: "",
    },
  },
  { timestamps: true }
);

export default model("Customer", customerSchema);
