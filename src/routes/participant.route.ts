import express from "express";
import { getParticipants, joinEvent } from "../controllers/participant.controller.js";
const router = express.Router();

router.post("/:eventId", joinEvent);
router.get("/:eventId", getParticipants);

export default router;
