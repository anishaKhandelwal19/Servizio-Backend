import { Router } from "express";
import {
    getEnquiriesByCustomer,
    getEnquiryById,
    createEnquiry,
    updateEnquiryStatus,
    getEnquiriesByRestaurant
} from "../../handlers/restaurant/enquiry.restaurant.handler.js";
import { addEnquirySchema } from "../../validations/restaurant/enquiry.restaurant.schema.js";
import { validateRequest } from "zod-express-middleware";
import ifRestaurant from "../../middlewares/restaurant.auth.js";
import auth from "../../middlewares/auth.js";
const router = Router();

router.route("/enquiry").get(auth, ifRestaurant, getEnquiriesByRestaurant);
router.route("/enquiry/status/:id").put(auth, ifRestaurant, updateEnquiryStatus);


export default router;
