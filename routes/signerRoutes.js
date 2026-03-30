import express from "express";
import { addSigner, getSigners } from "../controllers/signerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// all protected
router.use(protect);

// add signer
router.post("/documents/:id/signers", addSigner);

// get signers
router.get("/documents/:id/signers", getSigners);

export default router;
