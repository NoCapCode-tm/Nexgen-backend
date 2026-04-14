import express from "express";
import { createSignature } from "../controllers/signatureController.js";

const router = express.Router();

router.post("/", createSignature);

export default router;
