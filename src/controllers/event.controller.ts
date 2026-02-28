import type { Request, Response } from "express";
import Event from "../models/game/Event.js";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Event.countDocuments();
    res.status(200).json({
      success: true,
      data: events,
      pagination: { total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      poolPrize,
      prizePoolDescription,
      matchDate,
      matchTime,
      version,
      map,
      matchRules,
      feeType,
      pointsPerKill,
      sponsoredBy,
      spectateUrl,
    } = req.body;
    if (
      !title ||
      !poolPrize ||
      !prizePoolDescription ||
      !matchDate ||
      !matchTime ||
      !version ||
      !map ||
      !matchRules ||
      !feeType ||
      !pointsPerKill
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const newEvent = await Event.create({
      title,
      poolPrize,
      prizePoolDescription,
      matchDate,
      matchTime,
      version,
      map,
      matchRules,
      feeType,
      pointsPerKill,
      sponseredBy: sponsoredBy,
      spectacteUrl: spectateUrl,
    });

    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Invalid event data", error });
  }
};
