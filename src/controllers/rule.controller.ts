import type { Request, Response } from "express";
import MatchRules from "../models/game/MatchRules.js";

export const getRules = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const rules = await MatchRules.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await MatchRules.countDocuments();
    res.status(200).json({
      success: true,
      data: rules,
      pagination: { total, page, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const createRule = async (req: Request, res: Response) => {
  try {
    const { title, ruleText } = req.body;

    const newRule = await MatchRules.create({ title, rulesText: ruleText });
    res.status(201).json({ success: true, data: newRule });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid rule data", error });
  }
};
