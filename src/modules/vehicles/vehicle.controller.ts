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

const getVehiclesId = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);

  if (isNaN(vehicleId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle ID",
    });
  }
  const vehicle = await VehicleService.getVehiclesById(vehicleId);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }
  res.status(200).json({
    success: true,
    data: vehicle,
  });
};

const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);

  if (isNaN(vehicleId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle ID",
    });
  }

  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  const validTypes = ["car", "bike", "van", "SUV"];
  const validStatus = ["available", "booked"];

  if (type && !validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle type",
    });
  }

  if (availability_status && !validStatus.includes(availability_status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid availability status",
    });
  }

  if (daily_rent_price !== undefined && daily_rent_price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Daily rent price must be positive",
    });
  }

  const existingVehicle = await VehicleService.getVehiclesById(vehicleId);
  console.log("existingVehicle:", existingVehicle);

  if (!existingVehicle) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }

  // ✅ availability_status mapping
  let availabilityBoolean: boolean | undefined;
  if (availability_status) {
    availabilityBoolean = availability_status === "available";
  }

  // ✅ create final update object
  const updateData: any = {
    ...req.body,
  };
  if (availabilityBoolean !== undefined) {
    updateData.availability_status = availabilityBoolean;
  }

  const updatedVehicle = await VehicleService.updateVehicle(
    vehicleId,
    updateData
  );

  return res.status(200).json({
    success: true,
    message: "Vehicle updated successfully",
    data: updatedVehicle,
  });
};

export const vehicleController = {
  createVehicles,
  getVehicles,
  getVehiclesId,
  updateVehicle,
};
