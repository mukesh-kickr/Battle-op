import type { Request, Response } from "express";
import Game from "../models/game/Game.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const getGames = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page-1) * limit
        const games = await Game.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Game.countDocuments();

        res.status(200).json({
          success: true,
          count: games.length,
          total,
          page,
          totalPages: Math.ceil(total / limit),
          data: games,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export const createGame = async (req: Request, res: Response) => {
    try {
        const { title, gameName } = req.body;
        const file = req.file
        let imageUrl:string | undefined;
        if (file) {
            const result:any = await uploadToCloudinary(file.buffer);
            imageUrl = result.secure_url;
        }
        const newGame = new Game({
            title,
            name: gameName,
            imageUrl
        })
        await newGame.save();
        res.status(201).json({ success: true, data: newGame });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}