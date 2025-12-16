import express, { Request, Response } from "express";

import { initDB } from "./config/db";
import { authRouter } from "./modules/auth/auth.route";

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

initDB();

// signup route
app.use("/api/v1/auth/signup", authRouter);
app.use("/api/v1/auth/signin", authRouter);

// root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Vehicle Rental System successfully",
    path: req.path,
  });
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
