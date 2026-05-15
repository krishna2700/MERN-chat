import express from "express";
import {
  getSupportedLanguages,
  getSupportedSpokenLanguages,
  getSupportedProgLanguages,
  generateReadme,
  generateReadmeBulk,
  generateReadmeAll,
  generateReadmeRaw,
  generateReadmeByProgLang,
  generateReadmeByProgLangRaw,
  listSavedReadmes,
  deleteReadmeById,
  deleteReadmes,
} from "../controllers/readme.controller.js";

const router = express.Router();

// ── Language Discovery ─────────────────────────────────────────────────────────

// GET /api/readme/languages
// Returns all supported spoken languages AND programming languages.
router.get("/languages", getSupportedLanguages);

// GET /api/readme/languages/spoken
// Returns supported spoken/display languages (en, es, fr, de, zh …).
router.get("/languages/spoken", getSupportedSpokenLanguages);

// GET /api/readme/languages/programming
// Returns supported programming languages (javascript, python, go …).
router.get("/languages/programming", getSupportedProgLanguages);

// ── Generation — Spoken Language (localized UI text) ──────────────────────────

// POST /api/readme/generate
// Generate README in ONE spoken language.
// Body: {
//   language        : string   — spoken language code, default "en"
//   name            : string   — required, project name
//   description     : string   — required
//   features?       : string[] | CSV string
//   techStack?      : string[] | CSV string
//   repoUrl?        : string
//   license?        : string   — default "MIT"
//   version?        : string   — default "1.0.0"
//   author?         : string
//   programmingLanguage? : string — optional, enriches install/run commands
//   format?         : "json" | "raw"  — "raw" returns a .md file download
// }
router.post("/generate", generateReadme);

// POST /api/readme/generate/bulk
// Generate README in MULTIPLE spoken languages at once.
// Body: { languages: ["en","es","fr"], name, description, ... (same as above) }
router.post("/generate/bulk", generateReadmeBulk);

// POST /api/readme/generate/all
// Generate README in ALL 15 spoken languages at once.
// Body: { name, description, ... (same as above, without languages array) }
router.post("/generate/all", generateReadmeAll);

// GET /api/readme/generate/:language
// Convenience download endpoint — streams raw Markdown for the given spoken language.
// Query params: name, description, features (CSV), techStack (CSV), repoUrl,
//               license, version, author, programmingLanguage
// Example: GET /api/readme/generate/fr?name=MyApp&description=A+cool+app&programmingLanguage=python
router.get("/generate/:language", generateReadmeRaw);

// ── Generation — Programming Language ─────────────────────────────────────────

// POST /api/readme/generate/by-language
// Generate a README tailored to a specific programming language (English output).
// Body: {
//   programmingLanguage : string — required, e.g. "python", "go", "rust"
//   projectName         : string — required
//   description?        : string
//   author?             : string
//   features?           : string[]
//   license?            : string  — default "MIT"
//   githubUrl?          : string
//   version?            : string  — default "1.0.0"
//   format?             : "json" | "raw"
// }
router.post("/generate/by-language", generateReadmeByProgLang);

// GET /api/readme/generate/by-language/:progLang
// Convenience download endpoint for programming-language READMEs.
// Query params: projectName, description, author, features (CSV),
//               license, githubUrl, version
// Example: GET /api/readme/generate/by-language/rust?projectName=MyTool&author=Alice
router.get("/generate/by-language/:progLang", generateReadmeByProgLangRaw);

// ── Saved README Store (in-memory) ─────────────────────────────────────────────

// GET /api/readme/saved
// Returns all README entries currently tracked in the in-memory store.
// These are entries generated with { save: true } in the POST /generate body.
router.get("/saved", listSavedReadmes);

// DELETE /api/readme/delete
// Deletes ALL saved README entries (or filtered by language / programmingLanguage).
// Body (optional): { language?: string, programmingLanguage?: string }
// - No body             → delete everything
// - { language: "es" }  → delete only Spanish READMEs
// - { programmingLanguage: "python" } → delete only Python-flavoured READMEs
// - Both fields         → delete entries matching BOTH filters
router.delete("/delete", deleteReadmes);

// DELETE /api/readme/delete/:id
// Deletes a single saved README entry by its auto-generated ID.
// The ID is returned in the POST /generate response when save: true is passed.
router.delete("/delete/:id", deleteReadmeById);

export default router;
