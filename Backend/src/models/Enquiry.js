import { Schema, model } from "mongoose";

const enquirySchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    menuId: {
      type: Schema.Types.ObjectId,
      ref: 'Menu',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Confirmed'],
      default: 'Pending',
    },
    timeToPrepare: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Enquiry', enquirySchema);
