import { Router } from "express";
import { refresh } from "../../handlers/common/refresh.token.handler.js";
import { validateRequest } from "zod-express-middleware";
import { refreshTokenSchema } from "../../validations/common/refresh.token.schema.js";
const router = Router();

router.post("/refresh", validateRequest({ body: refreshTokenSchema }), refresh); //done

export default router;
