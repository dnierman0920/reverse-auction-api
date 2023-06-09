import express, { Application } from "express";
import routes from "./routes/index.router";

export default function createServer() {
  const app: Application = express();
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  app.use(routes);

  return app;
}
