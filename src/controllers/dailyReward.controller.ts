import type { Request, Response } from "express";
import DailyReward from "../models/reward/DailyReward.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const createDailyReard = async (req: Request, res: Response) => {
  try {
    const { amount, rewardDate } = req.body;
    const file = req.file;
    let imageUrl;
    if (file) {
      const result: any = await uploadToCloudinary(file.buffer);
      imageUrl = result.secure_url;
    }
    const newReward = await DailyReward.create({
      amount,
      rewardDate,
      imageUrl,
    });
    res.status(201).json({ success: true, data: newReward });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getDailyRewards = async (req: Request, res: Response) => {
  try {
    const rewards = await DailyReward.find().sort({ rewardDate: 1 });
    res
      .status(200)
      .json({ success: true, count: rewards.length, data: rewards });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
