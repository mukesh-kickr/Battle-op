import exprss from "express"
import { createNotification, getNotifications } from "../controllers/notification.controller.js";
import { createAnouncement, getAnnouncement } from "../controllers/anouncement.controller.js";

const router = exprss.Router();
router.post("/notifications", createNotification);
router.get("/notifications", getNotifications);

router.post("/announcements", createAnouncement);
router.get("/announcements", getAnnouncement);
export default router;