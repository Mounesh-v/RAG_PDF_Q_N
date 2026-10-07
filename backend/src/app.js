import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(
  cors({
    origin: "https://rag-pdf-q-n.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "Server is Running Of Rag Assistant" });
});

app.use(aiRoutes);

export default app;