import express from "express";
import auth from "../../middlewares/auth.js";
import { validateRequest } from "zod-express-middleware";
import ifcustomer from "../../middlewares/customer.auth.js";
import {
  loginCustomerSchema,
  registerCustomerSchema,
} from "../../validations/customer/auth.customer.schemas.js";
import {
  login,
  register,
} from "../../handlers/customer/auth.customer.handler.js";

const router = express.Router();

//////////////////////////////  ROUTES-STARTS-FROM-HERE   /////////////////////////////////////////////////////////
router
  .route("/login")
  .post(validateRequest({ body: loginCustomerSchema }), login); //done
router
  .route("/register")
  .post(validateRequest({ body: registerCustomerSchema }), register); //done
export default router;
