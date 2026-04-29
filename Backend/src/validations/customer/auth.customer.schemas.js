import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);
export const loginCustomerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerCustomerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  profilePicture: z.string().optional().default(""),
});
