import express from "express";
import { createCoupon, getCoupons } from "../controllers/coupon.controller.js";
import { createScratchCard, getScratchCards } from "../controllers/scratchCard.controller.js";
import { createDailyReard, getDailyRewards } from "../controllers/dailyReward.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
router.post("/coupons", createCoupon);
router.get("/coupons", getCoupons);

router.post("/scratchcards", createScratchCard);
router.get("/scratchcards", getScratchCards);

router.post("/dailyrewards",upload.single("image"), createDailyReard);
router.get("/dailyrewards", getDailyRewards);

export default router;