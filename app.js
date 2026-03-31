import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

const ClientUrl = process.env.REACT_PUBLIC_CLIENT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ClientUrl, // your frontend
    credentials: true, // IMPORTANT for cookies
  }),
);

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import signerRoutes from "./routes/signerRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api", signerRoutes);
app.use("/api/templates", templateRoutes);

export default app;
