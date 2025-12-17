import { Request, Response } from "express";

import { authService } from "./auth.service";
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const result = await authService.signInDB(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const authController = {
  createUser,
  signIn,
};
