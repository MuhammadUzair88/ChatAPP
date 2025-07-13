import express from "express";
import { fetchAllUsers, Login, signUp } from "../controllers/UserController.js";
import { UserAuth } from "../jwt/Auth.js";


const router = express.Router();

// Public routes
router.post("/signup",signUp);
router.post("/login", Login);

// Protected route to fetch all users (except self)
router.post("/users",UserAuth,fetchAllUsers);

export default router;
