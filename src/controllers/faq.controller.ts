import type { Request, Response } from "express";
import Faq from "../models/support/Faq.js";

export const createFaq = async (req: Request, res: Response) => {
    try {
        const { question, answer } = req.body;
        if(!question || !answer){
            return res.status(400).json({ success: false, message: "Question and answer are required" });
        }
        const newFaq = await Faq.create({ question, answer });
        res.status(201).json({ success: true, data: newFaq });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getFaqs = async (req:Request, res:Response) => {
    try {
        const faqs = await Faq.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: faqs });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const updateFaq = async (req: Request, res: Response) => {
    try {
        const faqId = req.params.id;
        const { question, answer } = req.body;
        const updatedFaq = await Faq.findByIdAndUpdate(
          faqId,
          { question, answer },
          { returnDocument: "after" },
        );
        if (!updatedFaq) {
            return res.status(404).json({ success: false, message: "Faq not found" });
        }
        res.status(200).json({ success: true, data: updatedFaq });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}
export const deleteFaq = async (req: Request, res: Response) => {
    try {
        const faqId = req.params.id;
        const deletedFaq = await Faq.findByIdAndDelete(faqId);
        if (!deletedFaq) {
            return res.status(404).json({ success: false, message: "Faq not found" });
        }
        res.status(200).json({ success: true, data:deleteFaq });
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }
}