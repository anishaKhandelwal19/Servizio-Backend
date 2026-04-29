import { Router } from "express";
import {
    getMenu,
    getMenuItemById,
    getMenuByRestaurantId
} from "../../handlers/restaurant/menu.restaurant.handler.js";
const router = Router();

router.route("/menu")
    .get(getMenu);

router.route("/menu/:id").get(getMenuItemById);

router.route("/menu/restaurant/:restaurant_id").get(getMenuByRestaurantId);

export default router;
