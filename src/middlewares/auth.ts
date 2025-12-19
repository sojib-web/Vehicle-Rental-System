import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import { AuthRequest } from "../interfaces/authRequest";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization header missing" });
    }

    let token: string | undefined;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader; // fallback if Bearer missing
    }

    console.log("Extracted token:", token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decodedToken = jwt.verify(token, env.jwtSecret) as JwtPayload;
    console.log("Decoded token:", decodedToken);

    req.user = { id: decodedToken.id, role: decodedToken.role };

    next();
  } catch (err: any) {
    console.log("JWT verify error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
};

export default auth;
