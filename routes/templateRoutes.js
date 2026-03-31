// routes/template.routes.js

import express from "express";
import {
  createTemplate,
  getTemplates,
  getTemplateById,
  deleteTemplate,
  updateTemplate,
} from "../controllers/templateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// all routes protected
router.use(protect);

router.post("/", createTemplate);
router.get("/", getTemplates);
router.get("/:id", getTemplateById);
router.patch("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
