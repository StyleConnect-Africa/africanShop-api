import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { register,login,updateStoreInfo,updateUserInfo } from "../controllers/authController.js";
import { uploadProfilePicture } from "../services/authService.js";
import { profilePictureValidator, validateLogin, validateRegister,validateStoreUpdate,validateUserUpdate } from "../validators/authValidator.js";
import { productUpload } from "../config/multerConfig.js";
const router = express.Router();

// Public routes
router.post("/register", validateRegister, register); // Public route
router.post("/login", validateLogin, login); // Public route
// User routes
router.get("/user", authMiddleware(['user']), (req, res) => {
    res.status(200).send("This is a protected route accessible only to users.");
});
router.put("/user/update", authMiddleware(['user']), validateUserUpdate, updateUserInfo);

// Vendor routes
router.get("/vendor", authMiddleware(['vendor']), (req, res) => {
    res.status(200).send("This is a protected route accessible only to vendors.");
});
router.put("/vendor/store/update", authMiddleware(['vendor']), validateStoreUpdate, updateStoreInfo);
// Route to upload profile picture
router.post('/upload-profile-picture', authMiddleware(), productUpload.single('avatar'),uploadProfilePicture,profilePictureValidator);


export default router;
