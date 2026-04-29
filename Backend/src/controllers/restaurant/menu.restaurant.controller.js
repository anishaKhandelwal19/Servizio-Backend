import express from "express";
import { validateRequest } from "zod-express-middleware";
import {
    addMenuItemSchema,
} from "../../validations/restaurant/menu.restaurant.schema.js";
import {
    addMenuItem,
} from "../../handlers/restaurant/menu.restaurant.handler.js";
import ifRestaurant from "../../middlewares/restaurant.auth.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();


router.route("/menu")
    .post(auth, ifRestaurant, validateRequest({ body: addMenuItemSchema }), addMenuItem);
export default router;
