import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

// Location schema
const locationSchema = z.object({
  address: z.string().min(1, "Address is required").openapi({
    example: "123 MG Road",
  }),
  city: z.string().min(1, "City is required").openapi({
    example: "Bengaluru",
  }),
  state: z.string().min(1, "State is required").openapi({
    example: "Karnataka",
  }),
  zipCode: z.string().min(1, "Zip code is required").openapi({
    example: "560001",
  }),
  country: z.string().min(1, "Country is required").openapi({
    example: "India",
  }),
  latitude: z.number().optional().openapi({
    example: 12.9716,
  }),
  longitude: z.number().optional().openapi({
    example: 77.5946,
  }),
});

// Working days schema
const workingDaysSchema = z.object({
  days: z.string().min(1, "Day name is required").openapi({
    example: "Monday",
  }),
  openingTime: z.string().min(1, "Opening time is required").openapi({
    example: "09:00 AM",
  }),
  closingTime: z.string().min(1, "Closing time is required").openapi({
    example: "10:00 PM",
  }),
});

// Menu item schema
const menuItemSchema = z.object({
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
  category: z
    .enum(["Starter", "Main Course", "Dessert", "Beverage", "Others"])
    .openapi({
      example: "Starter",
    }),
});

// Owner schema
const ownerSchema = z.object({
  name: z.string().min(1, "Owner name is required").openapi({
    example: "Kunal Jain",
  }),
  phone: z
    .string()
    .min(10, "Phone number should be at least 10 digits")
    .openapi({
      example: "9057508437",
    }),
  email: z.string().email("Invalid email address").openapi({
    example: "kunal@example.com",
  }),
});

// Bank details schema
const bankDetailsSchema = z.object({
  ifsc: z.string().min(1, "IFSC code is required").openapi({
    example: "SBIN0001234",
  }),
  accountNumber: z.string().min(1, "Account number is required").openapi({
    example: "123456789012",
  }),
});

// Main sign-up schema
export const registerRestaurantSchema = z.object({
  name: z.string().min(1, "Restaurant name is required").openapi({
    example: "Spice Garden",
  }),
  managementPhone: z
    .string()
    .min(10, "Management phone should be at least 10 digits")
    .openapi({
      example: "9123456789",
    }),
  restaurantEmail: z
    .string()
    .email("Invalid restaurant email address")
    .openapi({
      example: "contact@spicegarden.in",
    }),
  location: locationSchema,
  workingDays: z.array(workingDaysSchema),
  images: z.array(z.string()).optional().openapi({
    example: ["https://imgs.search.brave.com/TCg2-DrIqlJ2uEbMMFRhjg2eJssXutF3qI4AsNevg6Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTMw/MzgwODA1L3Bob3Rv/L2V1cm9wZWFuLXJl/c3RhdXJhbnQtaW4t/YnJpZ2h0LWNvbG9y/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WmhmSVZNclZH/NFAwcTVVNU9QOW0z/eUMxT3BiRWRFNzF5/WnBJNnp5c0NuVT0"],
  }),
  owner: ownerSchema,
  panNumber: z.string().min(1, "PAN number is required").openapi({
    example: "ABCDE1234F",
  }),
  gstinNumber: z.string().min(1, "GSTIN number is required").openapi({
    example: "29ABCDE1234F1Z5",
  }),
  bankDetails: bankDetailsSchema,
  fssaiRegistrationNumber: z
    .string()
    .min(1, "FSSAI registration number is required")
    .openapi({
      example: "11519021000243",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .openapi({
      example: "securePassword123",
    }),
});

// Login schema
export const loginRestaurantSchema = z.object({
  email: z.string().email("Invalid email address").openapi({
    example: "contact@spicegarden.in",
  }),
  password: z.string().min(1, "Password is required").openapi({
    example: "securePassword123",
  }),
});
