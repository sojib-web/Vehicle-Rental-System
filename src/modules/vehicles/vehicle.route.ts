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
router.get("/:vehicleId", vehicleController.getVehiclesId);
router.put(
  "/:vehicleId",
  auth,
  authorization("admin"),
  vehicleController.updateVehicle
);

export const vehicleRoute = router;
