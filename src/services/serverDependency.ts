import express, { Application } from "express";
import routes from "../routes/index.router";
import { Server } from "http";

export class ServerDependency {
  private _port: number;
  private _server: Server;

  constructor(port: number) {
    this._port = port;
    this._server = this.startServer();
  }

  app: Application = express();

  private startServer() {
    this.app.use(routes);
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    return this.app.listen(this._port, () => {
      console.log(`Server started at http://localhost:${this._port}`);
    });
  }

  public get server() {
    return this._server;
  }
}
