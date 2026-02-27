import express from "express";
import { createGame, getGames } from "../controllers/game.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
router.post("/",upload.single("gameImage"), createGame)
router.get("/", getGames)

export default router