import express from "express";

import { UserAuth } from "../jwt/Auth.js";
import { getmessages, SendMessage } from "../controllers/MessageController.js";


const router = express.Router();

router.post("/send/:id",UserAuth,SendMessage);
router.get("/get/:id",UserAuth,getmessages);

export default router;
