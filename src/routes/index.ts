import { Router } from "express";

import authMiddleware from "../middlewares/auth";
import errorRoute from "../middlewares/errorRoute";

import userController from "../controllers/userController";
import chapterController from "../controllers/chapterController";

const routes = Router();

routes.post("/user", userController.store);
routes.post("/session", userController.session);

routes.use(authMiddleware);

routes.get("/chapter", chapterController.index);

routes.use(errorRoute);

export default routes;
