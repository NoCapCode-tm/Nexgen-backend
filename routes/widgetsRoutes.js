import express from "express";
import {
  createWidget,
  getWidgetsByDocument,
  deleteWidget,
} from "../controllers/widgetsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// create
router.post("/", createWidget);

// get by document
router.get("/documents/:id", getWidgetsByDocument);

// delete
router.delete("/:id", deleteWidget);

export default router;
