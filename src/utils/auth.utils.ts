import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

export const generateToken = (payload: object) => {
  return jwt.sign(payload, env.jwtSecret as string, {
    expiresIn: "7d",
  });
};
