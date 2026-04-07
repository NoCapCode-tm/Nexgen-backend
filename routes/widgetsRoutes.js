import express from "express";
import {
  createWidget,
  getWidgetsByDocument,
  updateWidget,
  deleteWidget,
} from "../controllers/widgetsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// create
router.post("/", createWidget);

// get by document
router.get("/documents/:id", getWidgetsByDocument);

// update (sign/fill)
router.patch("/:id", updateWidget);

// delete
router.delete("/:id", deleteWidget);

export default router;
