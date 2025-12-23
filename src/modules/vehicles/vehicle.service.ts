import { pool } from "../../config/db";
import { Vehicle } from "../../interfaces/vehicle.interface";
const createVehicles = async (payload: Vehicle): Promise<Vehicle> => {
  const query = `INSERT INTO vehicles
    (vehicle_name, type,registration_number,daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  const values = [
    payload.vehicle_name,
    payload.type,
    payload.registration_number,
    payload.daily_rent_price,
    payload.availability_status,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getVehicles = async () => {
  const result = await pool.query("SELECT * FROM vehicles");
  return result.rows.map((vehicle) => ({
    ...vehicle,
    availability_status: vehicle.availability_status
      ? "available"
      : "not_available",
  }));
};
const getVehiclesById = async (vehicleId: number) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return result.rows[0];
};

const updateVehicle = async (vehicleId: number, payload: any) => {
  const query = `
    UPDATE vehicles
    SET
      vehicle_name = COALESCE($1, vehicle_name),
      type = COALESCE($2, type),
      registration_number = COALESCE($3, registration_number),
      daily_rent_price = COALESCE($4, daily_rent_price),
      availability_status = COALESCE($5, availability_status)
    WHERE id = $6
    RETURNING *
  `;

  const values = [
    payload.vehicle_name,
    payload.type,
    payload.registration_number,
    payload.daily_rent_price,
    payload.availability_status,
    vehicleId,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const VehicleService = {
  createVehicles,
  getVehicles,
  getVehiclesById,
  updateVehicle,
};
