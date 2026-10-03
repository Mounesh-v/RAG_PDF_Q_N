import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "Ai Course" });
});

app.use(aiRoutes);

export default app;