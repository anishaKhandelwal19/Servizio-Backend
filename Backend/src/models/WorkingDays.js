import { Schema, model } from "mongoose";

const workingDaysSchema = new Schema({
  days: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  }, // e.g., ['Monday', 'Tuesday']
  openingTime: { type: String, required: true }, // e.g., '09:00 AM'
  closingTime: { type: String, required: true }, // e.g., '10:00 PM'
});

export default model("WorkingDays", workingDaysSchema);
