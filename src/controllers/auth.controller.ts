import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, mobileNumber, email, dob, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            mobileNumber,
            email,
            dob,
            password: hashedPassword,
        })
        res.status(201).json({ success: true, data: user });
    } catch (error:any) {
        res
          .status(500)
          .json({
            success: false,
            message: "Server Error",
            error: error.message,
          });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Email and password are required" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error:any) {
       res.status(500).json({
         success: false,
         message: "Server Error",
         error: error.message,
       }); 
    }
}