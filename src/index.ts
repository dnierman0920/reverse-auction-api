import express from "express";
import { connectToDatabase } from "./services/database.service";
import * as dotenv from "dotenv";

var app = express();

connectToDatabase()
  .then(() => {
    dotenv.config();
    const port: string = process.env.PORT ?? "3000";
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
