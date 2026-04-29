import { createDocument } from "zod-openapi";
import { refreshTokenSchema } from "../validations/common/refresh.token.schema.js";
import {
  loginCustomerSchema,
  registerCustomerSchema,
} from "../validations/customer/auth.customer.schemas.js";
import { addMenuItemSchema } from "../validations/restaurant/menu.restaurant.schema.js";
import {
  loginRestaurantSchema,
  registerRestaurantSchema,
} from "../validations/restaurant/auth.restaurant.schemas.js";
import {
  addEnquirySchema,
  updateEnquiryStatusSchema,
} from "../validations/restaurant/enquiry.restaurant.schema.js";
import { rateEnquirySchema } from "../validations/customer/menu.restaurant.schema.js";

const openApiSpec = createDocument({
  openapi: "3.0.0",
  info: {
    title: "Servizio-Services",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  // for customer auth
  paths: {
    "/api/customer/login": {
      post: {
        tags: ["Customer Auth"],
        summary: "Login Customer",
        requestBody: {
          content: {
            "application/json": {
              schema: loginCustomerSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/register": {
      post: {
        tags: ["Customer Auth"],
        summary: "Register Customer",
        requestBody: {
          content: {
            "application/json": {
              schema: registerCustomerSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/refresh": {
      post: {
        tags: ["Utility"],
        summary: "Login",
        requestBody: {
          content: {
            "application/json": {
              schema: refreshTokenSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/restaurant/register": {
      post: {
        tags: ["Restaurant Auth"],
        summary: "Register Restaurant",
        requestBody: {
          content: {
            "application/json": {
              schema: registerRestaurantSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/restaurant/login": {
      post: {
        tags: ["Restaurant Auth"],
        summary: "Login Restaurant",
        requestBody: {
          content: {
            "application/json": {
              schema: loginRestaurantSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // Menu
    "/api/restaurant/menu": {
      post: {
        tags: ["Menu"],
        summary: "Add Menu",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: addMenuItemSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // get
    "/api/menu": {
      get: {
        tags: ["Menu"],
        summary: "Get Menu",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // get by id
    "/api/menu/{id}": {
      get: {
        tags: ["Menu"],
        summary: "Get Menu By Id",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // get by restaurant id
    "/api/menu/restaurant/{restaurant_id}": {
      get: {
        tags: ["Menu"],
        summary: "Get Menu By Restaurant Id",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "restaurant_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/restaurant": {
      get: {
        tags: ["Customer"],
        summary: "Get Restaurant",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/restaurant/{id}": {
      get: {
        tags: ["Customer"],
        summary: "Get Restaurant By Id",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/favorite/restaurant/{restaurant_id}": {
      put: {
        tags: ["Customer"],
        summary: "Add Favorite Restaurant",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "restaurant_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Customer"],
        summary: "Delete Favorite Restaurant",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "restaurant_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/favorite/restaurant": {
      get: {
        tags: ["Customer"],
        summary: "Get Favorite Restaurants",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/enquiry": {
      post: {
        tags: ["Customer"],
        summary: "Add Enquiry",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: addEnquirySchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      get: {
        tags: ["Customer"],
        summary: "Get Enquiries",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/restaurant/enquiry": {
      get: {
        tags: ["Restaurant"],
        summary: "Get Enquiries",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/restaurant/enquiry/status/{id}": {
      put: {
        tags: ["Restaurant"],
        summary: "Update Enquiry Status",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: updateEnquiryStatusSchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/customer/menu/rate/{id}": {
      put: {
        tags: ["Customer"],
        summary: "Rate Enquiry",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: rateEnquirySchema,
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
});

export default openApiSpec;
