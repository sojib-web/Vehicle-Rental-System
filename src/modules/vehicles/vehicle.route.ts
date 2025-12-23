import { Router } from "express";
import auth from "../../middlewares/auth";
import authorization from "../../middlewares/authorize";
import { vehicleController } from "./vehicle.controller";

const router = Router();
router.post(
  "/vehicles",
  auth,
  authorization("admin"),
  vehicleController.createVehicles
);
router.get("/vehicles", vehicleController.getVehicles);

export const vehicleRoute = router;
