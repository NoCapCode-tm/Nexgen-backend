import express from "express";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  createDocumentFromTemplate,
  completeDocument,
} from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// all routes protected
router.use(protect);

router.post("/", createDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.patch("/:id", updateDocument);
router.delete("/:id", deleteDocument);
router.post("/from-template", createDocumentFromTemplate);
router.patch("/:id/complete", completeDocument);

export default router;
