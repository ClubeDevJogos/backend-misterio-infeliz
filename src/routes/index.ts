import { Router } from "express";

import authMiddleware from "../middlewares/auth";

import userController from "../controllers/userController";

const routes = Router();

routes.post("/user", userController.store);
routes.post("/session", userController.session);

routes.use(authMiddleware);

export default routes;
