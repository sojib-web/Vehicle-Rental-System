import { pool } from "../../config/db";
import { Request, Response } from "express";
const getUsers = async () => {
  // Implementation for getUsers goes here
  const result = await pool.query("SELECT * FROM users");
  // Remove password from each user object
  const usersWithoutPassword = result.rows.map(({ password, ...user }) => user);
  return usersWithoutPassword;
};

const updatedUser = async (
  loggedInUser: { id: number; role: string },
  targetUserId: number,
  data: any
) => {
  if (loggedInUser.role === "customer" && loggedInUser.id !== targetUserId) {
    throw new Error("Forbidden: You can update only your own profile");
  }

  // cannot change role
  if (loggedInUser.role === "customer") {
    delete data.role;
  }

  // allowed fields
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key of ["name", "phone", "role"]) {
    if (data[key]) {
      fields.push(`${key}=$${idx}`);
      values.push(data[key]);
      idx++;
    }
  }

  if (!fields.length) {
    throw new Error("Nothing to update");
  }

  values.push(targetUserId);

  const query = `
    UPDATE users
    SET ${fields.join(", ")}, updated_at=NOW()
    WHERE id=$${idx}
    RETURNING id, name, email, phone, role
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUser = async () => {
  const result = await pool.query("SELECT * FROM users");
  console.log(result);
};
export const userService = {
  getUsers,
  updatedUser,
  deleteUser,
};
