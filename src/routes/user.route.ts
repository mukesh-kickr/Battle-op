import express from "express";
import { getUserList } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", getUserList);

export default router;