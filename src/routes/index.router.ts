import { Router } from "express";
import buyerRouter from "./buyer.router";

const routes = Router();

routes.use("/buyer", buyerRouter);

export default Router;
