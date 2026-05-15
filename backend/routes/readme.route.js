import express from "express";
import {
  getSupportedLanguages,
  generateReadme,
  generateReadmeRaw,
} from "../controllers/readme.controller.js";

const router = express.Router();

// GET  /api/readme/languages         — list all supported language codes
router.get("/languages", getSupportedLanguages);

// POST /api/readme/generate          — generate README (JSON response)
//   Body: { "language": "es" }
router.post("/generate", generateReadme);

// GET  /api/readme/generate/:language — generate README (raw Markdown download)
//   Example: GET /api/readme/generate/fr
router.get("/generate/:language", generateReadmeRaw);

export default router;
