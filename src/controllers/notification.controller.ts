import type { Request, Response } from "express";
import Notification from "../models/Notification.js";

export const createNotification = async (req: Request, res: Response) => {
    try {
        const { title, message } = req.body;
        if(!title || !message){
            return res.status(400).json({ success: false, message: "Title and message are required" });
        }

        const newNotification = await Notification.create({ title, message });
        res.status(201).json({ success: true, data: newNotification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
}

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const notifications = await Notification.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Notification.countDocuments();

        res.status(200).json({
          success: true,
          count: notifications.length,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          data: notifications,
        });
    } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server Error", error });
    }
}