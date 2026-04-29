import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import openApiSpec from "./config/openapi.js";

// import routes---------------------
import admin from "./controllers/customer/customer.controllers.js";
import refreshToken from "./controllers/common/refresh.token.controller.js";
import restaurant from "./controllers/restaurant/restaurant.controllers.js";
import menu from "./controllers/common/menu.controller.js";

import morgan from "morgan";

// initialze app instance----------
const app = express();

// middlewares---------------------
app.use(morgan("tiny"));
app.use(fileupload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Allow all origins (or restrict later)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(openApiSpec));

// use routes---------------------------
app.use("/api/customer", admin);
app.use("/api", refreshToken);
app.use("/api", menu);
app.use("/api/restaurant", restaurant);

app.get("/", (req, res) => {
  res.send("Servizio backend is running!");
});

export default app;
