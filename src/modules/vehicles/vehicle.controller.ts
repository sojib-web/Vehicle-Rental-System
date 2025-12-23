import { Request, Response } from "express";
import { VehicleService } from "./vehicle.service";

const createVehicles = async (req: Request, res: Response) => {
  const vehicle = await VehicleService.createVehicles(req.body);
  res.status(201).json({
    success: true,
    message: "vehicle added successfully",
    data: vehicle,
  });
};

const getVehicles = async (req: Request, res: Response) => {
  const vehicles = await VehicleService.getVehicles();

  res.status(200).json({
    success: true,
    message: "Vehicles retrieved successfully",
    data: vehicles,
  });
};

export const vehicleController = {
  createVehicles,
  getVehicles,
};
