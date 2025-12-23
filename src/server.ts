import express, { Request, Response } from "express";

import { initDB } from "./modules/auth/auth.sql";
import { authRouter } from "./modules/auth/auth.route";
import { env } from "./config/env";
import { userRoutes } from "./modules/users/user.route";
import { vehicleRoute } from "./modules/vehicles/vehicle.route";
import { createVehiclesDB } from "./sql/vehicles.sql";

const app = express();

// middleware
app.use(express.json());

const startServer = async () => {
  try {
    await initDB();
    await createVehiclesDB();
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};

// signup route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", authRouter);
// user route
app.use("/api/v1", userRoutes);
app.use("api/v1", userRoutes);

// vehicles  route
app.use("/api/v1", vehicleRoute);
app.use("/api/v1", vehicleRoute);

// root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Vehicle Rental System successfully",
    path: req.path,
  });
});

// server start
app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

startServer();
