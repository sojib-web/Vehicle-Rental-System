import dotenv, { config } from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const env = {
  port: getEnv("PORT"),
  databaseUrl: getEnv("DATABASE_URL"),
  jwtSecret: getEnv("JWT_SECRET"),
};
