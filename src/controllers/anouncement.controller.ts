import type { Request, Response } from "express";
import Announcment from "../models/Annoucment.js";

export const createAnouncement = async (req: Request, res: Response) => {
  try {
    const { targetUsers, title, message } = req.body;
    if (!targetUsers || targetUsers.length === 0) {
      res.status(400).json({
        success: false,
        message: "Please select at least one user",
      });
      return;
    }
    const newAnnouncement = await Announcment.create({
      targetUsers,
      title,
      message,
    });
    res.status(201).json({ success: true, data: newAnnouncement });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
export const getAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcements = await Announcment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
