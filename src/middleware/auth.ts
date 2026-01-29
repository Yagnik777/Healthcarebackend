import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user ={
      id: decoded.id, // 👈 THIS IS CRITICAL
    };
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
