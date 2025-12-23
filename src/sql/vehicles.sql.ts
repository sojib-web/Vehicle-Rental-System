import { pool } from "../config/db";

export const createVehiclesDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  daily_rent_price NUMERIC NOT NULL,
  availability_status VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

        `);
};
