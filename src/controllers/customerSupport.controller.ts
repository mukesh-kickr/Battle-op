import type { Request, Response } from "express";
import CustomerSupport from "../models/support/CustomerSupport.js";

export const updateCustomerSupport = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, watsappNumber, email, telegramNumber, telegramLink } =
      req.body;
    if (
      !mobileNumber ||
      !watsappNumber ||
      !email ||
      !telegramNumber ||
      !telegramLink
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const customerSupport = await CustomerSupport.findOneAndUpdate(
      {},
      {
        mobileNumber,
        watsappNumber,
        email,
        telegramNumber,
        telegramLink,
      },
      { upsert: true, returnDocument: "after", runValidators: true },
    );
    res.status(200).json({ success: true, data: customerSupport });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getCustomerSupports = async (req: Request, res: Response) => {
    try {
        const customerSupport = await CustomerSupport.findOne();
        res.status(200).json({ success: true, data: customerSupport });
    } catch (error:any) {
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
    }
}