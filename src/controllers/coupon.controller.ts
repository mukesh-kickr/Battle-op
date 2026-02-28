import type { Request, Response } from "express";
import Coupon from "../models/reward/Coupon.js";

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { couponType, minAmount, maxAmount, coinAmount, couponCode } =
      req.body;
    if (!couponType || !minAmount || !maxAmount || !coinAmount || !couponCode) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingCoupon = await Coupon.findOne({ couponCode });
    if (existingCoupon) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon code already exists" });
    }
    const newCoupon = await Coupon.create({
      couponType,
      minAmount,
      maxAmount,
      coinAmount,
      couponCode,
    });
    res.status(201).json({ success: true, data: newCoupon });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;
    const [coupons, total] = await Promise.all([
      Coupon.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Coupon.countDocuments(),
    ]);
    res.status(200).json({
      success: true,
      count: coupons.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: coupons,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      res.status(404).json({ success: false, message: "Coupon not found" });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
