import { Router } from "express";

import userController from "../controllers/userController";

const routes = Router();

routes.post("/user", userController.store);

export default routes;
