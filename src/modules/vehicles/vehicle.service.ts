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

export const VehicleService = {
  createVehicles,
  getVehicles,
};
