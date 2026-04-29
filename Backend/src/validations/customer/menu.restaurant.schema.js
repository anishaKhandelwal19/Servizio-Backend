import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

export const rateEnquirySchema = z.object({
    rating: z.number().int().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5").openapi({
        example: 5,
    }),
});