import { Schema, model } from "mongoose";
import Restaurant from "./Restaurant.js";

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: { type: [String] },
  timeToPrepare: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Starter", "Main Course", "Dessert", "Beverage", "Others"],
    required: true
  },
  ratings: [
    {
      customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
      score: { type: Number, min: 0, max: 5, required: true }
    }

  ]
});

// Function to calculate the average rating
const calculateAverageRating = async function (restaurantId) {
  try {
    // Get all menu items of the restaurant
    const menuItems = await model("Menu").find({ restaurant_id: restaurantId });

    let totalRating = 0;
    let totalReviews = 0;

    menuItems.forEach((item) => {
      if (item.ratings.length > 0) {
        totalReviews += item.ratings.length;
        totalRating += item.ratings.reduce((sum, r) => sum + r.score, 0);
      }
    });

    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Update the restaurant's average rating
    await Restaurant.findByIdAndUpdate(restaurantId, { rating: averageRating.toFixed(1) });
  } catch (error) {
    console.error("Error updating restaurant rating:", error);
  }
};

// Middleware: Update restaurant rating when a menu item is modified
menuItemSchema.post("save", async function () {
  await calculateAverageRating(this.restaurant_id);
});

// Middleware: Update restaurant rating when a menu item is deleted
menuItemSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await calculateAverageRating(doc.restaurant_id);
});

export default model("Menu", menuItemSchema);
