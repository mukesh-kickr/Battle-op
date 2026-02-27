import express from "express"
import { changePassword, createAdmin, loginAdmin, updateProfile, updateProfilePhoto } from "../controllers/admin.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.put("/profile", isAuth, updateProfile);
router.put("/profile/photo", isAuth, upload.single("profilePhoto"), updateProfilePhoto);
router.put("/profile/password", isAuth, changePassword); 

export default router