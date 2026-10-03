import { Router } from "express";
import { askAI } from "../controllers/ai.controller.js";
import { uploadPdfHandler } from "../controllers/pdf.controller.js";
import { uploadSingle } from "../middleware/upload.js";

const router = Router();

router.post("/api/ai", askAI);
router.post("/api/upload", uploadSingle, uploadPdfHandler);

export default router;
