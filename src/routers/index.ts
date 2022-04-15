
import { Router, Request, Response } from "express";
import user from "./user";

const routes = Router();

import auth from "./auth";
routes.use("/user", user);


export default routes;