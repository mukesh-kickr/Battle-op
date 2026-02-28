import express from "express";
import { createGame, getGames } from "../controllers/game.controller.js";
import { upload } from "../middleware/multer.js";
import { createBanner, getBanners } from "../controllers/banner.controller.js";
import { createEvent, getEvents } from "../controllers/event.controller.js";
import { createRule, getRules } from "../controllers/rule.controller.js";

const router = express.Router();
router.post("/",upload.single("gameImage"), createGame)
router.get("/", getGames)

router.post("/banners", upload.single("image"), createBanner)
router.get("/banners", getBanners)

router.post("/events", createEvent)
router.get("/events", getEvents)

router.post("/rules", createRule)
router.get("/rules", getRules)

export default router