import express from "express";
import { validateRequest } from "zod-express-middleware";
import {
  registerRestaurantSchema,
  loginRestaurantSchema,
} from "../../validations/restaurant/auth.restaurant.schemas.js";
import {
  register,
  login,
} from "../../handlers/restaurant/auth.restaurant.handler.js";

const router = express.Router();
router
  .route("/login")
  .post(validateRequest({ body: loginRestaurantSchema }), login); //done
router
  .route("/register")
  .post(validateRequest({ body: registerRestaurantSchema }), register); //done
export default router;
