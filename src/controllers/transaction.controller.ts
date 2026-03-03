import type { Request, Response } from "express";
import Transaction from "../models/Transaction.js";

export const getTrasactions = async (req: Request, res: Response) => {
    try {
        const { status, type, page = 1, limit = 15 } = req.query;
        const query: { status?: any; type?: any } = {};
        if (status) {
            query.status = status;
        }
        if (type) {
            query.type = type;
        }
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const transactions = await Transaction.find(query).skip(skip).limit(parseInt(limit as string)).sort({ createdAt: -1 });
        const total = await Transaction.countDocuments(query);
        res.status(200).json({
          success: true,
          data: transactions,
          pagination: { total, page: parseInt(page as string), totalPages: Math.ceil(total / parseInt(limit as string)) },
        });
    } catch (error:any) {
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        }); 
    }
}

export const updateTransactionStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const allowedStatus = ["Pending", "Rejected", "Completed", "Accepted"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }
        const transaction = await Transaction.findByIdAndUpdate(id, { status }, { returnDocument: "after" });
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        res.status(200).json({ success: true, data: transaction });
    } catch (error:any) {
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        }); 
    }
}
