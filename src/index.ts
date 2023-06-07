import express from "express";
import { connectToDatabase } from "./services/database.service";
import * as dotenv from "dotenv";
import { procurerRouter } from "./routes/procurer.router";

var app = express();

app.use("/procurer", procurerRouter);

connectToDatabase()
  .then(() => {
    dotenv.config();
    const port: string = process.env.PORT ?? "3000";
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
    app.get("/", function (req, res) {
      res.send("Hello World!");
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
