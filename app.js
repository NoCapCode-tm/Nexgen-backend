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
app.use("/api/auth", authRoutes);

export default app;
