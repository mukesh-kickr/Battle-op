import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import Admin from "../models/Admin.js";
import { generateToken } from "../config/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
    }
      const token = generateToken(admin._id.toString());
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        profilePhoto: admin.profilePhoto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req.id;
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    admin.firstName = firstName;
    admin.lastName = lastName;
    await admin.save();
    res.status(200).json({
      message: "Profile updated successfully",
      admin: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        profilePhoto: admin.profilePhoto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfilePhoto = async (req: Request, res: Response) => {
  try {
    const adminId = req.id;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Profile photo is required" });
    }
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.profilePhoto && admin.profilePhotoPublicId) {
      await cloudinary.uploader.destroy(admin.profilePhotoPublicId);
    }
      const result: any = await uploadToCloudinary(file?.buffer);
      admin.profilePhoto = result.secure_url;
      admin.profilePhotoPublicId = result.public_id;
      await admin.save();
      res.status(200).json({
        message: "Profile photo updated successfully",
        admin: {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          profilePhoto: admin.profilePhoto,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async(req:Request, res:Response) => {
    try {
        const adminId = req.id;
        const { password, confirmPassword } = req.body;
        if (!password || !confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password and confirm password are required" });   
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        admin.password = hashedPassword;
        await admin.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}