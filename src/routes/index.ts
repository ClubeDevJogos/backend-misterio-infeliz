import { Router } from "express";

import userController from "../controllers/userController";

const routes = Router();

routes.post("/user", userController.store);
routes.post("/session", userController.session);

export default routes;
