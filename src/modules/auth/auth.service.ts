// src/modules/auth/auth.service.ts
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string; // optional
}

const createUserDB = async (payload: CreateUserPayload) => {
  const { name, email, password, phone, role } = payload;

  // 1️⃣ Validate required fields
  if (!name || !email || !password || !phone) {
    throw new Error("All fields are required");
  }

  // 2️⃣ Password length check
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // 3️⃣ Lowercase email
  const emailLower = email.toLowerCase();

  // 4️⃣ Check if user already exists
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [emailLower]
  );
  if (existingUser.rows.length > 0) {
    throw new Error("User with this email already exists");
  }

  // 5️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6️⃣ Insert into DB
  const result = await pool.query(
    "INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, emailLower, hashedPassword, phone, role || "customer"]
  );

  return result.rows[0];
};

export const authService = {
  createUserDB,
};
