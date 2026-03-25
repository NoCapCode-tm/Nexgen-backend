import express from "express";
import {
  createContact,
  getContacts,
  deleteContact,
  updateContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// all routes protected
router.use(protect);

router.post("/", createContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact);
router.patch("/:id", updateContact);

export default router;
