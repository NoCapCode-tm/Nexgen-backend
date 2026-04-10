import express from "express";
import { createSignature } from "../controllers/signatureController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signatures", protect, createSignature);

export default router;
