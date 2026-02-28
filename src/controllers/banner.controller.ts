import type { Request, Response } from "express";
import Banner from "../models/game/Banner.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const getBanners = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const banners = await Banner.find().skip(skip).limit(limit).sort({ createdAt: -1 })
        const total = await Banner.countDocuments();
        res.status(200).json({
            success: true,
            data: banners,
            pagination:{total, page,  totalPages: Math.ceil(total/limit)}
        })
    } catch (error) {
        console.log("Internal server error")
        res
          .status(500)
          .json({ success: false, message: "Server Error", error });
    }
}

export const createBanner = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({success:false, message:"Image is required!"})
        }
        
        const result: any = await uploadToCloudinary(file.buffer);
        const imageUrl = result.secure_url;
        const newBanner = await Banner.create({title, imageUrl})
        res.status(201).json({ success: true, data: newBanner });
    } catch (error) {
         console.log("Internal server error")
        res
          .status(500)
          .json({ success: false, message: "Server Error", error });
    }
    
}