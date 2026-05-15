import express from "express";
const router = express.Router();

// Supported languages with their comment syntax and conventions
const LANGUAGE_CONFIGS = {
  javascript: {
    label: "JavaScript",
    extension: ".js",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "npm",
    runCommand: "node index.js",
    installCommand: "npm install",
    testCommand: "npm test",
    buildCommand: "npm run build",
    badgeColor: "yellow",
    logo: "javascript",
  },
  typescript: {
    label: "TypeScript",
    extension: ".ts",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "npm",
    runCommand: "npx ts-node index.ts",
    installCommand: "npm install",
    testCommand: "npm test",
    buildCommand: "npm run build",
    badgeColor: "blue",
    logo: "typescript",
  },
  python: {
    label: "Python",
    extension: ".py",
    commentStart: "#",
    blockCommentStart: '"""',
    blockCommentEnd: '"""',
    packageManager: "pip",
    runCommand: "python main.py",
    installCommand: "pip install -r requirements.txt",
    testCommand: "pytest",
    buildCommand: "python setup.py build",
    badgeColor: "blue",
    logo: "python",
  },
  java: {
    label: "Java",
    extension: ".java",
    commentStart: "//",
    blockCommentStart: "/**",
    blockCommentEnd: "*/",
    packageManager: "maven",
    runCommand: "java -jar app.jar",
    installCommand: "mvn install",
    testCommand: "mvn test",
    buildCommand: "mvn package",
    badgeColor: "red",
    logo: "java",
  },
  go: {
    label: "Go",
    extension: ".go",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "go mod",
    runCommand: "go run main.go",
    installCommand: "go mod download",
    testCommand: "go test ./...",
    buildCommand: "go build -o app",
    badgeColor: "cyan",
    logo: "go",
  },
  rust: {
    label: "Rust",
    extension: ".rs",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "cargo",
    runCommand: "cargo run",
    installCommand: "cargo build",
    testCommand: "cargo test",
    buildCommand: "cargo build --release",
    badgeColor: "orange",
    logo: "rust",
  },
  ruby: {
    label: "Ruby",
    extension: ".rb",
    commentStart: "#",
    blockCommentStart: "=begin",
    blockCommentEnd: "=end",
    packageManager: "gem",
    runCommand: "ruby main.rb",
    installCommand: "bundle install",
    testCommand: "rspec",
    buildCommand: "gem build",
    badgeColor: "red",
    logo: "ruby",
  },
  php: {
    label: "PHP",
    extension: ".php",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "composer",
    runCommand: "php index.php",
    installCommand: "composer install",
    testCommand: "phpunit",
    buildCommand: "composer build",
    badgeColor: "purple",
    logo: "php",
  },
  csharp: {
    label: "C#",
    extension: ".cs",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "nuget",
    runCommand: "dotnet run",
    installCommand: "dotnet restore",
    testCommand: "dotnet test",
    buildCommand: "dotnet build",
    badgeColor: "green",
    logo: "csharp",
  },
  cpp: {
    label: "C++",
    extension: ".cpp",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "cmake",
    runCommand: "./app",
    installCommand: "cmake . && make",
    testCommand: "ctest",
    buildCommand: "cmake --build .",
    badgeColor: "blue",
    logo: "cplusplus",
  },
  kotlin: {
    label: "Kotlin",
    extension: ".kt",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "gradle",
    runCommand: "kotlin Main.kt",
    installCommand: "gradle dependencies",
    testCommand: "gradle test",
    buildCommand: "gradle build",
    badgeColor: "purple",
    logo: "kotlin",
  },
  swift: {
    label: "Swift",
    extension: ".swift",
    commentStart: "//",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    packageManager: "swift package manager",
    runCommand: "swift run",
    installCommand: "swift package resolve",
    testCommand: "swift test",
    buildCommand: "swift build",
    badgeColor: "orange",
    logo: "swift",
  },
};

/**
 * Generate a README.md string based on project details and language config.
 */
function generateReadme(params) {
  const {
    projectName,
    description,
    language,
    authorName,
    authorGithub,
    repoName,
    features,
    license,
    includeContributing,
    includeChangelog,
    includeBadges,
    customInstall,
    customRun,
    customTest,
    customBuild,
    environment,
    apiEndpoints,
    screenshots,
    acknowledgements,
  } = params;

  const lang = LANGUAGE_CONFIGS[language.toLowerCase()];
  if (!lang) return null;

  const installCmd = customInstall || lang.installCommand;
  const runCmd = customRun || lang.runCommand;
  const testCmd = customTest || lang.testCommand;
  const buildCmd = customBuild || lang.buildCommand;

  const githubBase =
    authorGithub && repoName
      ? `https://github.com/${authorGithub}/${repoName}`
      : null;

  let md = "";

  // ── Title ──
  md += `# ${projectName}\n\n`;

  // ── Badges ──
  if (includeBadges !== false) {
    const langBadge = `![${lang.label}](https://img.shields.io/badge/${encodeURIComponent(lang.label)}-${lang.badgeColor}?style=flat-square&logo=${lang.logo}&logoColor=white)`;
    const licenseBadge = license
      ? `![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-green?style=flat-square)`
      : "";
    const starsBadge = githubBase
      ? `![Stars](https://img.shields.io/github/stars/${authorGithub}/${repoName}?style=flat-square)`
      : "";
    const forksBadge = githubBase
      ? `![Forks](https://img.shields.io/github/forks/${authorGithub}/${repoName}?style=flat-square)`
      : "";
    md += [langBadge, licenseBadge, starsBadge, forksBadge]
      .filter(Boolean)
      .join(" ");
    md += "\n\n";
  }

  // ── Description ──
  md += `## Overview\n\n${description}\n\n`;

  // ── Table of Contents ──
  const toc = [
    "- [Features](#features)",
    "- [Getting Started](#getting-started)",
    "  - [Prerequisites](#prerequisites)",
    "  - [Installation](#installation)",
    "  - [Running](#running)",
    "  - [Testing](#testing)",
    "  - [Building](#building)",
  ];
  if (environment && environment.length) toc.push("- [Environment Variables](#environment-variables)");
  if (apiEndpoints && apiEndpoints.length) toc.push("- [API Reference](#api-reference)");
  if (screenshots && screenshots.length) toc.push("- [Screenshots](#screenshots)");
  if (includeContributing) toc.push("- [Contributing](#contributing)");
  if (includeChangelog) toc.push("- [Changelog](#changelog)");
  if (license) toc.push("- [License](#license)");
  if (acknowledgements && acknowledgements.length) toc.push("- [Acknowledgements](#acknowledgements)");

  md += `## Table of Contents\n\n${toc.join("\n")}\n\n`;

  // ── Features ──
  md += `## Features\n\n`;
  if (features && features.length) {
    features.forEach((f) => {
      md += `- ${f}\n`;
    });
  } else {
    md += `- Core ${lang.label} project structure\n`;
    md += `- Easy setup and configuration\n`;
    md += `- Well-documented codebase\n`;
  }
  md += "\n";

  // ── Getting Started ──
  md += `## Getting Started\n\n`;

  // Prerequisites
  md += `### Prerequisites\n\n`;
  md += `Make sure you have the following installed:\n\n`;
  md += `- [${lang.label}](https://example.com) (latest stable version)\n`;
  md += `- ${lang.packageManager}\n`;
  md += `- Git\n\n`;

  // Clone
  if (githubBase) {
    md += `### Clone the Repository\n\n`;
    md += `\`\`\`bash\ngit clone ${githubBase}.git\ncd ${repoName}\n\`\`\`\n\n`;
  }

  // Installation
  md += `### Installation\n\n`;
  md += `\`\`\`bash\n${installCmd}\n\`\`\`\n\n`;

  // Environment Variables
  if (environment && environment.length) {
    md += `## Environment Variables\n\n`;
    md += `Create a \`.env\` file in the root directory and add the following variables:\n\n`;
    md += `\`\`\`env\n`;
    environment.forEach(({ key, value, description: desc }) => {
      if (desc) md += `# ${desc}\n`;
      md += `${key}=${value || "your_value_here"}\n`;
    });
    md += `\`\`\`\n\n`;
  }

  // Running
  md += `### Running\n\n`;
  md += `\`\`\`bash\n${runCmd}\n\`\`\`\n\n`;

  // Testing
  md += `### Testing\n\n`;
  md += `\`\`\`bash\n${testCmd}\n\`\`\`\n\n`;

  // Building
  md += `### Building\n\n`;
  md += `\`\`\`bash\n${buildCmd}\n\`\`\`\n\n`;

  // ── API Reference ──
  if (apiEndpoints && apiEndpoints.length) {
    md += `## API Reference\n\n`;
    md += `| Method | Endpoint | Description |\n`;
    md += `|--------|----------|-------------|\n`;
    apiEndpoints.forEach(({ method, endpoint, description: desc }) => {
      md += `| \`${(method || "GET").toUpperCase()}\` | \`${endpoint}\` | ${desc || ""} |\n`;
    });
    md += "\n";
  }

  // ── Screenshots ──
  if (screenshots && screenshots.length) {
    md += `## Screenshots\n\n`;
    screenshots.forEach(({ alt, url }) => {
      md += `![${alt || "Screenshot"}](${url})\n\n`;
    });
  }

  // ── Contributing ──
  if (includeContributing) {
    md += `## Contributing\n\n`;
    md += `Contributions are welcome! Please follow these steps:\n\n`;
    md += `1. Fork the repository\n`;
    md += `2. Create a new branch: \`git checkout -b feature/your-feature-name\`\n`;
    md += `3. Make your changes and commit: \`git commit -m "feat: add your feature"\`\n`;
    md += `4. Push to the branch: \`git push origin feature/your-feature-name\`\n`;
    md += `5. Open a Pull Request\n\n`;
    if (githubBase) {
      md += `Please read our [Contributing Guide](${githubBase}/blob/main/CONTRIBUTING.md) for details.\n\n`;
    }
  }

  // ── Changelog ──
  if (includeChangelog) {
    md += `## Changelog\n\n`;
    md += `See [CHANGELOG.md](./CHANGELOG.md) for a full history of changes.\n\n`;
  }

  // ── License ──
  if (license) {
    md += `## License\n\n`;
    md += `This project is licensed under the **${license}** License`;
    if (githubBase) {
      md += ` — see the [LICENSE](${githubBase}/blob/main/LICENSE) file for details`;
    }
    md += `.\n\n`;
  }

  // ── Author ──
  if (authorName) {
    md += `## Author\n\n`;
    md += `**${authorName}**`;
    if (authorGithub) md += ` — [@${authorGithub}](https://github.com/${authorGithub})`;
    md += "\n\n";
  }

  // ── Acknowledgements ──
  if (acknowledgements && acknowledgements.length) {
    md += `## Acknowledgements\n\n`;
    acknowledgements.forEach((a) => {
      md += `- ${a}\n`;
    });
    md += "\n";
  }

  return md.trim();
}

// ────────────────────────────────────────────────────────────
// GET /api/readme/languages  — list all supported languages
// ────────────────────────────────────────────────────────────
router.get("/languages", (req, res) => {
  const languages = Object.entries(LANGUAGE_CONFIGS).map(([key, cfg]) => ({
    key,
    label: cfg.label,
    extension: cfg.extension,
    packageManager: cfg.packageManager,
  }));
  res.json({ success: true, count: languages.length, languages });
});

// ────────────────────────────────────────────────────────────
// POST /api/readme/generate  — generate README content
// ────────────────────────────────────────────────────────────
router.post("/generate", (req, res) => {
  const {
    projectName,
    description,
    language,
    authorName,
    authorGithub,
    repoName,
    features,
    license,
    includeContributing,
    includeChangelog,
    includeBadges,
    customInstall,
    customRun,
    customTest,
    customBuild,
    environment,
    apiEndpoints,
    screenshots,
    acknowledgements,
  } = req.body;

  // ── Validation ──
  if (!projectName || typeof projectName !== "string") {
    return res.status(400).json({
      success: false,
      error: "projectName is required and must be a string.",
    });
  }
  if (!description || typeof description !== "string") {
    return res.status(400).json({
      success: false,
      error: "description is required and must be a string.",
    });
  }
  if (!language || typeof language !== "string") {
    return res.status(400).json({
      success: false,
      error: "language is required and must be a string.",
    });
  }
  if (!LANGUAGE_CONFIGS[language.toLowerCase()]) {
    return res.status(400).json({
      success: false,
      error: `Unsupported language: "${language}". Supported: ${Object.keys(LANGUAGE_CONFIGS).join(", ")}.`,
    });
  }

  const content = generateReadme(req.body);

  res.json({
    success: true,
    language: LANGUAGE_CONFIGS[language.toLowerCase()].label,
    filename: "README.md",
    content,
    charCount: content.length,
    lineCount: content.split("\n").length,
  });
});

// ────────────────────────────────────────────────────────────
// POST /api/readme/generate/download  — stream README as file
// ────────────────────────────────────────────────────────────
router.post("/generate/download", (req, res) => {
  const { language } = req.body;

  if (!language || !LANGUAGE_CONFIGS[language.toLowerCase()]) {
    return res.status(400).json({
      success: false,
      error: "Valid language is required.",
    });
  }
  if (!req.body.projectName || !req.body.description) {
    return res.status(400).json({
      success: false,
      error: "projectName and description are required.",
    });
  }

  const content = generateReadme(req.body);
  const projectSlug = (req.body.projectName || "project")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${projectSlug}-README.md"`
  );
  res.send(content);
});

// ────────────────────────────────────────────────────────────
// GET /api/readme/template/:language  — pre-filled template
// ────────────────────────────────────────────────────────────
router.get("/template/:language", (req, res) => {
  const lang = req.params.language.toLowerCase();
  const cfg = LANGUAGE_CONFIGS[lang];
  if (!cfg) {
    return res.status(404).json({
      success: false,
      error: `Language "${req.params.language}" not found. Supported: ${Object.keys(LANGUAGE_CONFIGS).join(", ")}.`,
    });
  }

  const template = {
    projectName: "My Awesome Project",
    description: `A brief description of your ${cfg.label} project.`,
    language: lang,
    authorName: "Your Name",
    authorGithub: "yourusername",
    repoName: "my-awesome-project",
    features: [
      "Feature one",
      "Feature two",
      "Feature three",
    ],
    license: "MIT",
    includeContributing: true,
    includeChangelog: false,
    includeBadges: true,
    customInstall: cfg.installCommand,
    customRun: cfg.runCommand,
    customTest: cfg.testCommand,
    customBuild: cfg.buildCommand,
    environment: [
      { key: "PORT", value: "3000", description: "Server port" },
      { key: "NODE_ENV", value: "development", description: "App environment" },
    ],
    apiEndpoints: [
      { method: "GET", endpoint: "/api/health", description: "Health check" },
      { method: "POST", endpoint: "/api/resource", description: "Create a resource" },
    ],
    screenshots: [],
    acknowledgements: [
      `Built with ${cfg.label}`,
      "Inspired by open-source projects",
    ],
  };

  res.json({ success: true, language: cfg.label, template });
});

// ────────────────────────────────────────────────────────────
// DELETE /api/readme/:language  — delete a specific language README file
// Removes README.<lang>.md (or README.md for "en") from the working directory
// ────────────────────────────────────────────────────────────
router.delete("/:language", (req, res) => {
  import("fs").then(({ default: fs }) => {
    import("path").then(({ default: path }) => {
      const lang = req.params.language.toLowerCase().trim();

      if (!LANGUAGE_CONFIGS[lang]) {
        return res.status(404).json({
          success: false,
          error: `Language "${req.params.language}" is not supported.`,
          supportedLanguages: Object.keys(LANGUAGE_CONFIGS),
        });
      }

      const filename = lang === "en" ? "README.md" : `README.${lang}.md`;
      const filePath = path.join(process.cwd(), filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: `README file "${filename}" does not exist on disk.`,
          filename,
          language: LANGUAGE_CONFIGS[lang].label,
        });
      }

      fs.unlinkSync(filePath);
      return res.json({
        success: true,
        message: `README file "${filename}" has been deleted.`,
        filename,
        language: LANGUAGE_CONFIGS[lang].label,
        deletedAt: new Date().toISOString(),
      });
    });
  });
});

// ────────────────────────────────────────────────────────────
// DELETE /api/readme/bulk  — delete READMEs for multiple languages
// Body: { languages: ["javascript", "python", "go"] }
// ────────────────────────────────────────────────────────────
router.delete("/bulk", (req, res) => {
  import("fs").then(({ default: fs }) => {
    import("path").then(({ default: path }) => {
      const { languages } = req.body;

      if (!Array.isArray(languages) || languages.length === 0) {
        return res.status(400).json({
          success: false,
          error: '"languages" must be a non-empty array of language keys.',
          example: { languages: ["javascript", "python", "go"] },
          supportedLanguages: Object.keys(LANGUAGE_CONFIGS),
        });
      }

      const deleted = [], notFound = [], unsupported = [];

      for (const lang of languages) {
        const key = lang.toLowerCase().trim();
        if (!LANGUAGE_CONFIGS[key]) {
          unsupported.push({ language: lang, error: `Unsupported language: "${lang}"` });
          continue;
        }
        const filename = `README.${key}.md`;
        const filePath = path.join(process.cwd(), filename);
        if (!fs.existsSync(filePath)) {
          notFound.push({ language: key, filename, error: "File not found on disk." });
          continue;
        }
        fs.unlinkSync(filePath);
        deleted.push({ language: LANGUAGE_CONFIGS[key].label, filename, deletedAt: new Date().toISOString() });
      }

      return res.json({
        success: true,
        requested: languages.length,
        deleted: deleted.length,
        notFound: notFound.length,
        unsupported: unsupported.length,
        results: deleted,
        ...(notFound.length && { notFoundFiles: notFound }),
        ...(unsupported.length && { unsupportedLanguages: unsupported }),
      });
    });
  });
});

// ────────────────────────────────────────────────────────────
// DELETE /api/readme/all  — delete ALL README files from disk
// ────────────────────────────────────────────────────────────
router.delete("/all", (req, res) => {
  import("fs").then(({ default: fs }) => {
    import("path").then(({ default: path }) => {
      const deleted = [], notFound = [];

      for (const key of Object.keys(LANGUAGE_CONFIGS)) {
        const filename = key === "en" ? "README.md" : `README.${key}.md`;
        const filePath = path.join(process.cwd(), filename);
        if (!fs.existsSync(filePath)) {
          notFound.push({ language: key, filename });
          continue;
        }
        fs.unlinkSync(filePath);
        deleted.push({ language: LANGUAGE_CONFIGS[key].label, filename, deletedAt: new Date().toISOString() });
      }

      return res.json({
        success: true,
        totalLanguages: Object.keys(LANGUAGE_CONFIGS).length,
        deleted: deleted.length,
        notFound: notFound.length,
        results: deleted,
        ...(notFound.length && { notFoundFiles: notFound }),
      });
    });
  });
});

export default router;
