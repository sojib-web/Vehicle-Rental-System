import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import authorization from "../../middlewares/authorize";
import { verifyAdmin } from "../../middlewares/verifyAdmin";

const router = Router();

router.get(
  "/users",
  verifyAdmin,
  auth,
  authorization("admin"),
  userController.getAllUsers
);
router.put("/users/:userId", auth, userController.updateUser);
export const userRoutes = router;
