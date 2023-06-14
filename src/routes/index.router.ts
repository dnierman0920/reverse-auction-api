import { Router } from "express";
import buyerRouter from "./buyer.router";
import router from "./buyer.router";

const routes = Router();

routes.use("/buyer", router);

export default routes;
