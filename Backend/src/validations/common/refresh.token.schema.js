import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);
export const refreshTokenSchema = z.object({
  refresh_token: z.string().openapi({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkZjA5YTRjMWU3ZjAwMWY1YTZjMWQiLCJwaG9uZV9udW1iZXIiOiI5ODU3MjEwMzQ1IiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNjMwNjIwMzI4LCJleHAiOjE2MzIyMjIzMjgsInN1YiI6InNhbWVlciJ9.5yV5kqg3n7e9H2ZQg1E4y9Vr2P6c0Q3e9Qc6k9H2ZQg",
  }),
});

// ✅ What is the validation folder for?

// This folder contains input validation logic for your API requests.
// It ensures that the data coming from the client (frontend or API consumer) matches the expected structure, type, and rules before hitting your business logic or database.

// Example: When creating a user, you want:
// email to be a valid email format.
// password to have a minimum length.
// age to be a number and not negative.

// Reason to prefer Zod over regex/manual validation in JS:

// ✔ Maintainable – Change the rule in one place, it applies everywhere.
// ✔ Consistent – No mismatched validations across APIs.
// ✔ Reusable – Same schema can be used for multiple endpoints

// Purpose
// This schema validates incoming API requests where the client sends a refresh_token to get a new access token.
// It also generates OpenAPI documentation automatically, showing this field and its example in Swagger UI.

// zod is your core validation library.
// zod-openapi integrates Zod schemas with OpenAPI for automatic API documentation generation.
