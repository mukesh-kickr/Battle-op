import express from "express"
import { getCustomerSupports, updateCustomerSupport } from "../controllers/customerSupport.controller.js";
import { createFaq, deleteFaq, getFaqs, updateFaq } from "../controllers/faq.controller.js";
import { deleteAppContent, getAppContents, saveAppContent, updateAppContent } from "../controllers/appContent.controller.js";

const router = express.Router();
router.put("/support", updateCustomerSupport);
router.get("/support", getCustomerSupports);

router.post("/faq", createFaq);
router.get("/faq", getFaqs);
router.put("/faq/:id", updateFaq);
router.delete("/faq/:id", deleteFaq);

router.post("/app-content", saveAppContent);
router.get("/app-content", getAppContents);
router.put("/app-content/:id", updateAppContent);
router.delete("/app-content/:id", deleteAppContent);

export default router;