import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ── Language Definitions (15 languages) ───────────────────────────────────────
const LANGUAGES = {
  en: {
    name: "English", direction: "ltr",
    s: {
      overview: "Overview", features: "Features", tech: "Tech Stack",
      install: "Installation", usage: "Usage", contrib: "Contributing", license: "License",
      contribText: "Contributions are welcome! Please open an issue or submit a pull request.",
      licenseText: (l) => `This project is licensed under the ${l} License.`,
      defaultDesc: "A brief description of what this project does.",
      defaultFeatures: ["Easy to use", "Well documented", "Highly configurable"],
    },
  },
  es: {
    name: "Spanish (Español)", direction: "ltr",
    s: {
      overview: "Descripción general", features: "Características", tech: "Tecnologías",
      install: "Instalación", usage: "Uso", contrib: "Contribuciones", license: "Licencia",
      contribText: "¡Las contribuciones son bienvenidas! Por favor abre un issue o envía un pull request.",
      licenseText: (l) => `Este proyecto está licenciado bajo la Licencia ${l}.`,
      defaultDesc: "Una breve descripción del proyecto.",
      defaultFeatures: ["Fácil de usar", "Bien documentado", "Altamente configurable"],
    },
  },
  fr: {
    name: "French (Français)", direction: "ltr",
    s: {
      overview: "Présentation", features: "Fonctionnalités", tech: "Technologies",
      install: "Installation", usage: "Utilisation", contrib: "Contributions", license: "Licence",
      contribText: "Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request.",
      licenseText: (l) => `Ce projet est sous licence ${l}.`,
      defaultDesc: "Une brève description du projet.",
      defaultFeatures: ["Facile à utiliser", "Bien documenté", "Hautement configurable"],
    },
  },
  de: {
    name: "German (Deutsch)", direction: "ltr",
    s: {
      overview: "Übersicht", features: "Funktionen", tech: "Technologien",
      install: "Installation", usage: "Verwendung", contrib: "Mitwirken", license: "Lizenz",
      contribText: "Beiträge sind willkommen! Bitte öffne ein Issue oder sende einen Pull Request.",
      licenseText: (l) => `Dieses Projekt steht unter der ${l}-Lizenz.`,
      defaultDesc: "Eine kurze Beschreibung des Projekts.",
      defaultFeatures: ["Einfach zu bedienen", "Gut dokumentiert", "Hochkonfigurierbar"],
    },
  },
  zh: {
    name: "Chinese Simplified (中文)", direction: "ltr",
    s: {
      overview: "项目概述", features: "功能特性", tech: "技术栈",
      install: "安装", usage: "使用方法", contrib: "贡献", license: "许可证",
      contribText: "欢迎贡献！请提交 Issue 或 Pull Request。",
      licenseText: (l) => `本项目基于 ${l} 许可证开源。`,
      defaultDesc: "项目的简要描述。",
      defaultFeatures: ["易于使用", "文档完善", "高度可配置"],
    },
  },
  ja: {
    name: "Japanese (日本語)", direction: "ltr",
    s: {
      overview: "概要", features: "機能", tech: "技術スタック",
      install: "インストール", usage: "使い方", contrib: "コントリビューション", license: "ライセンス",
      contribText: "コントリビューションを歓迎します！Issue を開くか Pull Request を送ってください。",
      licenseText: (l) => `このプロジェクトは ${l} ライセンスの下に公開されています。`,
      defaultDesc: "プロジェクトの簡単な説明。",
      defaultFeatures: ["使いやすい", "ドキュメントが充実", "高い設定可能性"],
    },
  },
  pt: {
    name: "Portuguese (Português)", direction: "ltr",
    s: {
      overview: "Visão Geral", features: "Funcionalidades", tech: "Tecnologias",
      install: "Instalação", usage: "Uso", contrib: "Contribuições", license: "Licença",
      contribText: "Contribuições são bem-vindas! Abra uma issue ou envie um pull request.",
      licenseText: (l) => `Este projeto está licenciado sob a Licença ${l}.`,
      defaultDesc: "Uma breve descrição do projeto.",
      defaultFeatures: ["Fácil de usar", "Bem documentado", "Altamente configurável"],
    },
  },
  hi: {
    name: "Hindi (हिन्दी)", direction: "ltr",
    s: {
      overview: "अवलोकन", features: "विशेषताएं", tech: "तकनीकी स्टैक",
      install: "इंस्टॉलेशन", usage: "उपयोग", contrib: "योगदान", license: "लाइसेंस",
      contribText: "योगदान स्वागत योग्य है! कृपया एक issue खोलें या pull request सबमिट करें।",
      licenseText: (l) => `यह प्रोजेक्ट ${l} लाइसेंस के अंतर्गत है।`,
      defaultDesc: "प्रोजेक्ट का संक्षिप्त विवरण।",
      defaultFeatures: ["उपयोग में आसान", "अच्छी तरह प्रलेखित", "उच्च कॉन्फ़िगर करने योग्य"],
    },
  },
  ar: {
    name: "Arabic (العربية)", direction: "rtl",
    s: {
      overview: "نظرة عامة", features: "الميزات", tech: "التقنيات المستخدمة",
      install: "التثبيت", usage: "الاستخدام", contrib: "المساهمة", license: "الرخصة",
      contribText: "المساهمات مرحب بها! يرجى فتح issue أو إرسال pull request.",
      licenseText: (l) => `هذا المشروع مرخص بموجب رخصة ${l}.`,
      defaultDesc: "وصف مختصر للمشروع.",
      defaultFeatures: ["سهل الاستخدام", "موثق جيداً", "قابل للتهيئة بشكل كبير"],
    },
  },
  ru: {
    name: "Russian (Русский)", direction: "ltr",
    s: {
      overview: "Обзор", features: "Возможности", tech: "Технологии",
      install: "Установка", usage: "Использование", contrib: "Участие в разработке", license: "Лицензия",
      contribText: "Вклад приветствуется! Пожалуйста, откройте issue или отправьте pull request.",
      licenseText: (l) => `Этот проект распространяется под лицензией ${l}.`,
      defaultDesc: "Краткое описание проекта.",
      defaultFeatures: ["Простота использования", "Хорошая документация", "Высокая настраиваемость"],
    },
  },
  ko: {
    name: "Korean (한국어)", direction: "ltr",
    s: {
      overview: "개요", features: "기능", tech: "기술 스택",
      install: "설치", usage: "사용법", contrib: "기여", license: "라이선스",
      contribText: "기여를 환영합니다! Issue를 열거나 Pull Request를 제출해 주세요.",
      licenseText: (l) => `이 프로젝트는 ${l} 라이선스에 따라 배포됩니다.`,
      defaultDesc: "이 프로젝트에 대한 간략한 설명입니다.",
      defaultFeatures: ["사용하기 쉬운", "문서화 잘 됨", "고도로 구성 가능"],
    },
  },
  it: {
    name: "Italian (Italiano)", direction: "ltr",
    s: {
      overview: "Panoramica", features: "Funzionalità", tech: "Tecnologie Utilizzate",
      install: "Installazione", usage: "Utilizzo", contrib: "Contributi", license: "Licenza",
      contribText: "I contributi sono benvenuti! Apri un issue o invia una pull request.",
      licenseText: (l) => `Questo progetto è distribuito con la Licenza ${l}.`,
      defaultDesc: "Una breve descrizione del progetto.",
      defaultFeatures: ["Facile da usare", "Ben documentato", "Altamente configurabile"],
    },
  },
  nl: {
    name: "Dutch (Nederlands)", direction: "ltr",
    s: {
      overview: "Overzicht", features: "Functies", tech: "Gebruikte Technologieën",
      install: "Installatie", usage: "Gebruik", contrib: "Bijdragen", license: "Licentie",
      contribText: "Bijdragen zijn welkom! Open een issue of dien een pull request in.",
      licenseText: (l) => `Dit project is gelicenseerd onder de ${l} Licentie.`,
      defaultDesc: "Een korte beschrijving van het project.",
      defaultFeatures: ["Gemakkelijk te gebruiken", "Goed gedocumenteerd", "Zeer configureerbaar"],
    },
  },
  tr: {
    name: "Turkish (Türkçe)", direction: "ltr",
    s: {
      overview: "Genel Bakış", features: "Özellikler", tech: "Kullanılan Teknolojiler",
      install: "Kurulum", usage: "Kullanım", contrib: "Katkıda Bulunma", license: "Lisans",
      contribText: "Katkılarınızı bekliyoruz! Lütfen bir issue açın veya pull request gönderin.",
      licenseText: (l) => `Bu proje ${l} Lisansı kapsamında lisanslanmıştır.`,
      defaultDesc: "Projenin kısa bir açıklaması.",
      defaultFeatures: ["Kullanımı kolay", "İyi belgelenmiş", "Yüksek düzeyde yapılandırılabilir"],
    },
  },
  pl: {
    name: "Polish (Polski)", direction: "ltr",
    s: {
      overview: "Przegląd", features: "Funkcje", tech: "Użyte Technologie",
      install: "Instalacja", usage: "Użycie", contrib: "Wkład", license: "Licencja",
      contribText: "Wkłady są mile widziane! Otwórz issue lub wyślij pull request.",
      licenseText: (l) => `Ten projekt jest objęty licencją ${l}.`,
      defaultDesc: "Krótki opis projektu.",
      defaultFeatures: ["Łatwy w użyciu", "Dobrze udokumentowany", "Wysoko konfigurowalny"],
    },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function normalizeArray(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val.filter(Boolean);
  return String(val).split(",").map((v) => v.trim()).filter(Boolean);
}

function buildReadme(langCode, p) {
  const { s } = LANGUAGES[langCode];
  const slug = (p.name || "my-project").toLowerCase().replace(/\s+/g, "-");
  const repo = p.repoUrl || `https://github.com/your-username/${slug}`;
  const license = p.license || "MIT";
  const features = normalizeArray(p.features) || s.defaultFeatures;
  const techStack = normalizeArray(p.techStack) || [];
  const description = p.description || s.defaultDesc;

  const techSection = techStack.length
    ? `## ${s.tech}\n\n${techStack.map((t) => `- ${t}`).join("\n")}\n\n`
    : "";

  return `# ${p.name}

## ${s.overview}

${description}

## ${s.features}

${features.map((f) => `- ${f}`).join("\n")}

${techSection}## ${s.install}

\`\`\`bash
git clone ${repo}
cd ${slug}
npm install
\`\`\`

## ${s.usage}

\`\`\`bash
npm start
\`\`\`

## ${s.contrib}

${s.contribText}

## ${s.license}

${s.licenseText(license)}
`;
}

function langFilename(langCode) {
  return langCode === "en" ? "README.md" : `README.${langCode}.md`;
}

// ── Root Info ──────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    name: "README Generator API",
    version: "2.0.0",
    description: "Generate professional README files in 15 languages",
    supportedLanguages: Object.keys(LANGUAGES).length,
    endpoints: [
      { method: "GET",    path: "/api/readme/languages",           description: "List all supported languages" },
      { method: "POST",   path: "/api/readme/generate",            description: "Generate README in one language" },
      { method: "POST",   path: "/api/readme/generate/bulk",       description: "Generate README in multiple languages" },
      { method: "POST",   path: "/api/readme/generate/all",        description: "Generate README in all 15 languages" },
      { method: "GET",    path: "/api/readme/generate/:language",  description: "Download raw Markdown for a language" },
      { method: "DELETE", path: "/api/readme/:language",           description: "Delete a specific language README file from disk" },
      { method: "DELETE", path: "/api/readme/bulk",                description: "Delete multiple language README files (body: { languages: [...] })" },
      { method: "DELETE", path: "/api/readme/all",                 description: "Delete all README files from disk" },
    ],
  });
});

// ── GET /api/readme/languages ──────────────────────────────────────────────────
app.get("/api/readme/languages", (req, res) => {
  res.json({
    count: Object.keys(LANGUAGES).length,
    languages: Object.entries(LANGUAGES).map(([code, l]) => ({
      code,
      name: l.name,
      direction: l.direction,
    })),
  });
});

// ── POST /api/readme/generate ──────────────────────────────────────────────────
// Body: { language, name, description, features?, techStack?, repoUrl?, license?, format? }
app.post("/api/readme/generate", (req, res) => {
  const {
    language = "en",
    name,
    description,
    features,
    techStack,
    repoUrl = "",
    license = "MIT",
    format = "json",
  } = req.body;

  if (!name?.trim())
    return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim())
    return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  const langCode = language.toLowerCase().trim();
  if (!LANGUAGES[langCode])
    return res.status(404).json({
      success: false,
      error: `Language code "${langCode}" is not supported.`,
      supportedCodes: Object.keys(LANGUAGES),
    });

  const content = buildReadme(langCode, { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license });
  const filename = langFilename(langCode);
  const langInfo = LANGUAGES[langCode];

  if (format === "raw") {
    return res
      .setHeader("Content-Type", "text/markdown; charset=utf-8")
      .setHeader("Content-Disposition", `attachment; filename="${filename}"`)
      .send(content);
  }

  return res.status(201).json({
    success: true,
    language: { code: langCode, name: langInfo.name, direction: langInfo.direction },
    filename,
    content,
    characterCount: content.length,
    lineCount: content.split("\n").length,
  });
});

// ── POST /api/readme/generate/bulk ────────────────────────────────────────────
// Body: { languages: ["en","es"], name, description, ... }
app.post("/api/readme/generate/bulk", (req, res) => {
  const { languages, name, description, features, techStack, repoUrl = "", license = "MIT" } = req.body;

  if (!name?.trim())
    return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim())
    return res.status(400).json({ success: false, error: 'Missing required field: "description"' });
  if (!Array.isArray(languages) || languages.length === 0)
    return res.status(400).json({
      success: false,
      error: '"languages" must be a non-empty array of language codes',
      example: { languages: ["en", "es", "fr"] },
      supportedCodes: Object.keys(LANGUAGES),
    });

  const params = { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license };
  const results = [], errors = [];

  for (const lang of languages) {
    const langCode = lang.toLowerCase().trim();
    if (!LANGUAGES[langCode]) {
      errors.push({ language: lang, error: `Unsupported code: "${lang}"` });
      continue;
    }
    const content = buildReadme(langCode, params);
    results.push({
      language: { code: langCode, name: LANGUAGES[langCode].name, direction: LANGUAGES[langCode].direction },
      filename: langFilename(langCode),
      content,
      characterCount: content.length,
      lineCount: content.split("\n").length,
    });
  }

  return res.status(201).json({
    success: true,
    requested: languages.length,
    generated: results.length,
    failed: errors.length,
    results,
    ...(errors.length && { errors }),
  });
});

// ── POST /api/readme/generate/all ─────────────────────────────────────────────
// Body: { name, description, features?, techStack?, repoUrl?, license? }
app.post("/api/readme/generate/all", (req, res) => {
  const { name, description, features, techStack, repoUrl = "", license = "MIT" } = req.body;

  if (!name?.trim())
    return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim())
    return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  const params = { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license };

  const readmes = Object.keys(LANGUAGES).map((langCode) => {
    const content = buildReadme(langCode, params);
    return {
      language: { code: langCode, name: LANGUAGES[langCode].name, direction: LANGUAGES[langCode].direction },
      filename: langFilename(langCode),
      content,
      characterCount: content.length,
      lineCount: content.split("\n").length,
    };
  });

  return res.status(201).json({ success: true, count: readmes.length, readmes });
});

// ── DELETE /api/readme/:language  — delete a specific language README ─────────
// Removes README.<lang>.md (or README.md for "en") from the working directory
app.delete("/api/readme/:language", (req, res) => {
  import("fs").then(({ default: fs }) => {
    import("path").then(({ default: path }) => {
      const langCode = req.params.language.toLowerCase().trim();
      if (!LANGUAGES[langCode]) {
        return res.status(404).json({
          success: false,
          error: `Language code "${langCode}" is not supported.`,
          supportedCodes: Object.keys(LANGUAGES),
        });
      }

      const filename = langFilename(langCode);
      const filePath = path.join(process.cwd(), filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: `README file "${filename}" does not exist on disk.`,
          filename,
          language: { code: langCode, name: LANGUAGES[langCode].name },
        });
      }

      fs.unlinkSync(filePath);
      return res.json({
        success: true,
        message: `README file "${filename}" has been deleted.`,
        filename,
        language: { code: langCode, name: LANGUAGES[langCode].name },
        deletedAt: new Date().toISOString(),
      });
    });
  });
});

// ── DELETE /api/readme/bulk  — delete multiple language READMEs ───────────────
// Body: { languages: ["en","es","fr"] }
app.delete("/api/readme/bulk", (req, res) => {
  import("fs").then(({ default: fs }) => {
    import("path").then(({ default: path }) => {
      const { languages } = req.body;

      if (!Array.isArray(languages) || languages.length === 0) {
        return res.status(400).json({
          success: false,
          error: '"languages" must be a non-empty array of language codes.',
          example: { languages: ["en", "es", "fr"] },
          supportedCodes: Object.keys(LANGUAGES),
        });
      }

      const deleted = [], notFound = [], unsupported = [];

      for (const lang of languages) {
        const langCode = lang.toLowerCase().trim();
        if (!LANGUAGES[langCode]) {
          unsupported.push({ language: lang, error: `Unsupported code: "${lang}"` });
          continue;
        }
        const filename = langFilename(langCode);
        const filePath = path.join(process.cwd(), filename);
        if (!fs.existsSync(filePath)) {
          notFound.push({ language: langCode, filename, error: "File not found on disk." });
          continue;
        }
        fs.unlinkSync(filePath);
        deleted.push({
          language: { code: langCode, name: LANGUAGES[langCode].name },
          filename,
          deletedAt: new Date().toISOString(),
        });
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

// ── DELETE /api/readme/all  — delete ALL language README files ────────────────
app.delete("/api/readme/all", (req, res) => {
  import("fs").then(({ default: fs }) => {
    import("path").then(({ default: path }) => {
      const deleted = [], notFound = [];

      for (const langCode of Object.keys(LANGUAGES)) {
        const filename = langFilename(langCode);
        const filePath = path.join(process.cwd(), filename);
        if (!fs.existsSync(filePath)) {
          notFound.push({ language: langCode, filename });
          continue;
        }
        fs.unlinkSync(filePath);
        deleted.push({
          language: { code: langCode, name: LANGUAGES[langCode].name },
          filename,
          deletedAt: new Date().toISOString(),
        });
      }

      return res.json({
        success: true,
        totalLanguages: Object.keys(LANGUAGES).length,
        deleted: deleted.length,
        notFound: notFound.length,
        results: deleted,
        ...(notFound.length && { notFoundFiles: notFound }),
      });
    });
  });
});

// ── GET /api/readme/generate/:language  (raw Markdown download) ───────────────
app.get("/api/readme/generate/:language", (req, res) => {
  const langCode = req.params.language.toLowerCase().trim();
  if (!LANGUAGES[langCode])
    return res.status(404).json({
      success: false,
      error: `Language code "${langCode}" is not supported.`,
      supportedCodes: Object.keys(LANGUAGES),
    });

  const name       = req.query.name        || "My Project";
  const description = req.query.description || LANGUAGES[langCode].s.defaultDesc;
  const features   = req.query.features   ? req.query.features.split(",")   : null;
  const techStack  = req.query.techStack   ? req.query.techStack.split(",")  : null;
  const repoUrl    = req.query.repoUrl     || "";
  const license    = req.query.license     || "MIT";

  const content  = buildReadme(langCode, { name, description, features, techStack, repoUrl, license });
  const filename = langFilename(langCode);

  return res
    .setHeader("Content-Type", "text/markdown; charset=utf-8")
    .setHeader("Content-Disposition", `attachment; filename="${filename}"`)
    .send(content);
});

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = 3456;
app.listen(PORT, () => {
  console.log(`README API running on http://localhost:${PORT}`);
  console.log(`Supported languages: ${Object.keys(LANGUAGES).length}`);
});
