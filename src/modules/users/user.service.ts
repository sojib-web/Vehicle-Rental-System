import { Request, Response } from "express";
import { pool } from "../../config/db";

const getUsers = async () => {
  // Implementation for getUsers goes here
  const result = await pool.query("SELECT * FROM users");
  // Remove password from each user object
  const usersWithoutPassword = result.rows.map(({ password, ...user }) => user);

  return usersWithoutPassword;
};

export const userService = {
  getUsers,
};
