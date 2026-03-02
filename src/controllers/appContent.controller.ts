import type { Request, Response } from "express";
import AppContent from "../models/support/AppContent.js";

export const saveAppContent = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        if (!['Terms & Conditions', 'Privacy Policy', 'About Us'].includes(title)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid title" });
        }
        const savedContent = await AppContent.findOneAndUpdate({ title }, { title, content }, { upsert: true, new: true, runValidators: true });
        res.status(200).json({ success: true, data: savedContent });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getAppContents = async(req: Request, res: Response) => {
    try {
        const contents = await AppContent.find().sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: contents });
    } catch (error:any) {
         res.status(500).json({ success: false, error: error.message });
    }
}

export const updateAppContent = async (req: Request, res: Response) => {
    try {
        const contentId = req.params.id;
        const { content } = req.body;
        if(!contentId || !content){
            return res.status(400).json({ success: false, message: "Content id and content are required" });
        }
        const updatedContent = await AppContent.findByIdAndUpdate(
          contentId,
          { content },
          { returnDocument: "after" },
        );
        if (!updatedContent) {
            return res.status(404).json({ success: false, message: "Content not found" });
        }
        res.status(200).json({ success: true, data: updatedContent });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const deleteAppContent = async (req: Request, res: Response) => {
    try {
        const contentId = req.params.id;
        const deletedContent = await AppContent.findByIdAndDelete(contentId);
        if (!deletedContent) {
            return res.status(404).json({ success: false, message: "Content not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error:any) {
         res.status(500).json({ success: false, error: error.message });
    }
}