import express from "express";
import { validateRequest } from "zod-express-middleware";
import {
    addMenuItemSchema,
} from "../../validations/restaurant/menu.restaurant.schema.js";
import {
    getRestaurantById,
    getRestaurants,
    putFavoriteRestaurant,
    deleteFavoriteRestaurant,
    getFavoriteRestaurants,
} from "../../handlers/customer/restaurant.customer.handler.js";
import ifCustomer from "../../middlewares/customer.auth.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();


router.route("/restaurant")
    .get(auth, ifCustomer, getRestaurants);
router.route("/restaurant/:id")
    .get(auth, ifCustomer, getRestaurantById);
router.route("/favorite/restaurant/:restaurant_id")
    .put(auth, ifCustomer, putFavoriteRestaurant)
router.route("/favorite/restaurant/:restaurant_id")
    .delete(auth, ifCustomer, deleteFavoriteRestaurant);
router.route("/favorite/restaurant")
    .get(auth, ifCustomer, getFavoriteRestaurants);

export default router;
