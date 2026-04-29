import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

export const addEnquirySchema = z.object({
    menuId: z.string().min(1, "Menu ID is required").openapi({
        example: "60f7d8d6c6d1b7c6e0f0d6f1",
    }),
    quantity: z.number().positive("Quantity must be a positive number").openapi({
        example: 2,
    }),
    totalPrice: z.number().positive("Total price must be a positive number").openapi({
        example: 500,
    }),
});

export const updateEnquiryStatusSchema = z.object({
    status: z.string().min(1, "Status is required").openapi({
        example: "Accepted",
    }),
    timeToPrepare: z.number().positive("Time to prepare must be a positive number").optional().openapi({
        example: 20,
    }),
});
