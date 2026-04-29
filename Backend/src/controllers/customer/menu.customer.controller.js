import { Router } from "express";
import {
    rateMenu
} from "../../handlers/restaurant/menu.restaurant.handler.js";
import ifcustomer from "../../middlewares/customer.auth.js";
import auth from "../../middlewares/auth.js";
import { rateEnquirySchema } from "../../validations/customer/menu.restaurant.schema.js";
import { validateRequest } from "zod-express-middleware";
const router = Router();

router.route("/menu/rate/:id").put(auth, ifcustomer, validateRequest({ body: rateEnquirySchema }), rateMenu);
export default router;
