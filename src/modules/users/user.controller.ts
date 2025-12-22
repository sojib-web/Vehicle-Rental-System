import { Request, Response } from "express";
import { userService } from "./user.service";
import { AuthRequest } from "../../interfaces/authRequest";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const targetUserId = Number(req.params.userId);
    const loggedInUser = req.user!;

    const updatedUser = await userService.updatedUser(
      loggedInUser,
      targetUserId,
      req.body
    );

    console.log("✅ [Controller] User updated:", updatedUser);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("❌ [Controller] Error:", error.message);
    res.status(error.message.includes("Forbidden") ? 403 : 500).json({
      success: false,
      message: error.message,
    });
  }
};
export const userController = {
  getAllUsers,
  updateUser,
};
