import express, { Application } from "express";
import routes from "./routes/index.router";

export class ServerDependency {
  private _port: number;

  constructor(port: number) {
    this._port = port;
  }

  app: Application = express();

  public startServer() {
    this.app.use(routes);
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    return this.app.listen(this._port, () => {
      console.log(`Server started at http://localhost:${this._port}`);
    });
  }
}
