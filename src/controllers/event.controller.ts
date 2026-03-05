import type { Request, Response } from "express";
import Event from "../models/game/Event.js";
import Game from "../models/game/Game.js";

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
      entryFee,
      pointsPerKill,
      sponsoredBy,
      spectateUrl,
      gameId
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
      !entryFee ||
      !pointsPerKill ||
      !gameId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ success: false, message: "Game not found" });
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
      entryFee,
      pointsPerKill,
      sponseredBy: sponsoredBy,
      spectacteUrl: spectateUrl,
      gameId
    });

    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Invalid event data", error });
  }
};

export const updateRoomIdAndPassword = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const { roomId, password } = req.body;
    const event = await Event.findByIdAndUpdate(eventId, { roomId, roomPassword: password }, { returnDocument: "after" });
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
}