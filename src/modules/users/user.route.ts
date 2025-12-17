import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/users", userController.getAllUsers);
export const userRoutes = router;
