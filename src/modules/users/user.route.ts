import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import authorization from "../../middlewares/authorize";

const router = Router();

router.get("/users", auth, authorization("admin"), userController.getAllUsers);
export const userRoutes = router;
