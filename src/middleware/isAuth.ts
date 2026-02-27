import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      id?: string; 
    }
  }
}
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

    try {
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
      
    req.id = decoded.id; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};