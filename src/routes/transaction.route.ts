import express from "express";
import { getTrasactions, updateTransactionStatus } from "../controllers/transaction.controller.js";
const router = express.Router();

router.get("/", getTrasactions);
router.put("/:id", updateTransactionStatus);

export default router;