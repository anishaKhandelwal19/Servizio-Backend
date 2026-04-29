import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

// addMenuItem schema

export const addMenuItemSchema = z.object({
    name: z.string().min(1, "Menu item name is required").openapi({
        example: "Paneer Tikka",
    }),
    description: z.string().optional().openapi({
        example:
            "A delicious starter made from marinated paneer grilled to perfection.",
    }),
    images: z.array(z.string()).optional().openapi({
        example: ["https://example.com/paneer-tikka.jpg"],
    }),
    price: z.number().positive("Price must be a positive number").openapi({
        example: 250,
    }),
    timeToPrepare: z.number().positive("Time to prepare must be a positive number").openapi({
        example: 20,
    }),
    category: z.string().min(1, "Category is required").openapi({
        example: "Starter",
    }),
});
