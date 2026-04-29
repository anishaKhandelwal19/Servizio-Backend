import app from "./app.js";
import { config } from "dotenv";
import connectToDB from "./config/mongoDB.js";
import initializeFirebase from "./config/fireBaseAdmin.js";
import openApiSpec from "./config/openapi.js";
// import fs from "fs";

initializeFirebase();

// fs.writeFileSync("openapi.json", JSON.stringify(openApiSpec, null, 2));
// load env variables---------------
config();

// connect to database--------
connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
});
