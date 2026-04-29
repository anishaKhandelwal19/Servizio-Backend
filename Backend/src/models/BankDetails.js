import { Schema, model } from "mongoose";

const bankDetailsSchema = new Schema({
  ifsc: { type: String, required: true },
  accountNumber: { type: String, required: true },
});

export default model("BankDetails", bankDetailsSchema);
