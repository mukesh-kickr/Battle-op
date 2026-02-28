import type { Request, Response } from "express";
import ScratchCard from "../models/reward/ScratchCard.js";

export const createScratchCard = async (req: Request, res: Response) => {
  try {
    const { minWinningCoins, maxWinningCoins, targetMatchCount } = req.body;
    const newCard = await ScratchCard.create({
      minWinningCoins,
      maxWinningCoins,
      targetMatchCount,
    });
    res.status(201).json({ success: true, data: newCard });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getScratchCards = async (req: Request, res: Response) => {
  try {
    const cards = await ScratchCard.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateScratchCard = async (req: Request, res: Response) => {
    try {
        const { minWinningCoins, maxWinningCoins, targetMatchCount } = req.body;
        const card = await ScratchCard.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }
        card.minWinningCoins = minWinningCoins;
        card.maxWinningCoins = maxWinningCoins;
        card.targetMatchCount = targetMatchCount;
        await card.save();
        res.status(200).json({ success: true, data: card });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}