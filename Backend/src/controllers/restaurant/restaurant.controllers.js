import { Router } from "express";

const router = Router();

import auth from "./auth.restaurant.controller.js";
import menu from "./menu.restaurant.controller.js";
import enquiry from "./enquiry.restaurant.controller.js";
router.use(auth);
router.use(menu);
router.use(enquiry);
export default router;
