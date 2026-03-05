import type { Request, Response } from "express";
import { Types } from "mongoose";
import Participant from "../models/game/Participant.js";
import Event from "../models/game/Event.js";
import User from "../models/User.js";

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    if (!eventId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing eventId or userId" });
    }

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const alreadyJoined = await Participant.findOne({
      eventId: new Types.ObjectId(eventId as string),
      userId: new Types.ObjectId(userId as string),
    });

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this event",
      });
    }

    const entryFee = event.entryFee || 0;
    if (user.totalBalance < entryFee) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance to join",
        required: entryFee,
        currentBalance: user.totalBalance,
      });
    }

    user.totalBalance -= entryFee;
    await user.save();
    const newParticipant = new Participant({
      userId: new Types.ObjectId(userId as string),
      eventId: new Types.ObjectId(eventId as string),
    });

    await newParticipant.save();

    res.status(201).json({
      success: true,
      message: "Successfully joined the event",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getParticipants = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing eventId" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;
    const targetEventId = new Types.ObjectId(eventId as string);

    const participants = await Participant.find({ eventId: targetEventId })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name mobileNumber email dob createdAt totalBalance")
      .sort({ registeredAt: -1 });

    const total = await Participant.countDocuments({ eventId: targetEventId });

    res.status(200).json({
      success: true,
      count: participants.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: participants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
