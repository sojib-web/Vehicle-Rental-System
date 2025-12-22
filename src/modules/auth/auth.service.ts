// src/modules/auth/auth.service.ts
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/auth.utils";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
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
  delete result.rows[0].password; // remove password from returned data

  return result.rows[0];
};

const signInDB = async (email: string, password: string) => {
  // Implementation for signInDB goes here
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const emailLower = email.toLowerCase();
  const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [
    emailLower,
  ]);

  if (userResult.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = userResult.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  delete user.password;
  return { user, token };
};

export const authService = {
  createUserDB,
  signInDB,
};
