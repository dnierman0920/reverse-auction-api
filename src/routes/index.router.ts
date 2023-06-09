import { Router } from "express";
import procurerRouter from "./procurer.router";

const routes = Router();

routes.use("/procurer", procurerRouter);

export default Router;
