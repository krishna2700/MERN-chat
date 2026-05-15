// README Generator Controller — v3.0
// Generates README files in 15 spoken languages AND 12 programming language flavors.
// Supports single, bulk, all-at-once generation, and programming-language-aware templates.

// ── Spoken Language Definitions ───────────────────────────────────────────────

const SPOKEN_LANGUAGES = {
  en: {
    name: "English", direction: "ltr",
    s: {
      overview: "Overview", features: "Features", tech: "Tech Stack",
      install: "Installation", usage: "Usage", contrib: "Contributing", license: "License",
      prerequisites: "Prerequisites", projectStructure: "Project Structure",
      tableOfContents: "Table of Contents",
      contribText: "Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.",
      licenseText: (l) => `This project is licensed under the ${l} License.`,
      defaultDesc: "A brief description of what this project does.",
      defaultFeatures: ["Easy to use", "Well documented", "Highly configurable"],
      madeWith: "Made with love by",
    },
  },
  es: {
    name: "Spanish (Español)", direction: "ltr",
    s: {
      overview: "Descripción General", features: "Características", tech: "Tecnologías",
      install: "Instalación", usage: "Uso", contrib: "Contribuciones", license: "Licencia",
      prerequisites: "Requisitos Previos", projectStructure: "Estructura del Proyecto",
      tableOfContents: "Tabla de Contenidos",
      contribText: "¡Las contribuciones son bienvenidas! Por favor haz un fork del repositorio, crea una rama de característica y envía un pull request.",
      licenseText: (l) => `Este proyecto está licenciado bajo la Licencia ${l}.`,
      defaultDesc: "Una breve descripción del proyecto.",
      defaultFeatures: ["Fácil de usar", "Bien documentado", "Altamente configurable"],
      madeWith: "Hecho con amor por",
    },
  },
  fr: {
    name: "French (Français)", direction: "ltr",
    s: {
      overview: "Présentation", features: "Fonctionnalités", tech: "Technologies",
      install: "Installation", usage: "Utilisation", contrib: "Contributions", license: "Licence",
      prerequisites: "Prérequis", projectStructure: "Structure du Projet",
      tableOfContents: "Table des Matières",
      contribText: "Les contributions sont les bienvenues ! Veuillez forker le dépôt, créer une branche de fonctionnalité et soumettre une pull request.",
      licenseText: (l) => `Ce projet est sous licence ${l}.`,
      defaultDesc: "Une brève description du projet.",
      defaultFeatures: ["Facile à utiliser", "Bien documenté", "Hautement configurable"],
      madeWith: "Fait avec amour par",
    },
  },
  de: {
    name: "German (Deutsch)", direction: "ltr",
    s: {
      overview: "Übersicht", features: "Funktionen", tech: "Technologien",
      install: "Installation", usage: "Verwendung", contrib: "Mitwirken", license: "Lizenz",
      prerequisites: "Voraussetzungen", projectStructure: "Projektstruktur",
      tableOfContents: "Inhaltsverzeichnis",
      contribText: "Beiträge sind willkommen! Bitte forke das Repository, erstelle einen Feature-Branch und sende einen Pull Request.",
      licenseText: (l) => `Dieses Projekt steht unter der ${l}-Lizenz.`,
      defaultDesc: "Eine kurze Beschreibung des Projekts.",
      defaultFeatures: ["Einfach zu bedienen", "Gut dokumentiert", "Hochkonfigurierbar"],
      madeWith: "Mit Liebe gemacht von",
    },
  },
  zh: {
    name: "Chinese Simplified (中文)", direction: "ltr",
    s: {
      overview: "项目概述", features: "功能特性", tech: "技术栈",
      install: "安装", usage: "使用方法", contrib: "贡献", license: "许可证",
      prerequisites: "前提条件", projectStructure: "项目结构",
      tableOfContents: "目录",
      contribText: "欢迎贡献！请 fork 仓库，创建功能分支并提交 pull request。",
      licenseText: (l) => `本项目基于 ${l} 许可证开源。`,
      defaultDesc: "项目的简要描述。",
      defaultFeatures: ["易于使用", "文档完善", "高度可配置"],
      madeWith: "由 ... 用心制作",
    },
  },
  ja: {
    name: "Japanese (日本語)", direction: "ltr",
    s: {
      overview: "概要", features: "機能", tech: "技術スタック",
      install: "インストール", usage: "使い方", contrib: "コントリビューション", license: "ライセンス",
      prerequisites: "前提条件", projectStructure: "プロジェクト構造",
      tableOfContents: "目次",
      contribText: "コントリビューションを歓迎します！リポジトリをフォークして、フィーチャーブランチを作成し、プルリクエストを送ってください。",
      licenseText: (l) => `このプロジェクトは ${l} ライセンスの下に公開されています。`,
      defaultDesc: "プロジェクトの簡単な説明。",
      defaultFeatures: ["使いやすい", "ドキュメントが充実", "高い設定可能性"],
      madeWith: "... が愛を込めて制作",
    },
  },
  pt: {
    name: "Portuguese (Português)", direction: "ltr",
    s: {
      overview: "Visão Geral", features: "Funcionalidades", tech: "Tecnologias",
      install: "Instalação", usage: "Uso", contrib: "Contribuições", license: "Licença",
      prerequisites: "Pré-requisitos", projectStructure: "Estrutura do Projeto",
      tableOfContents: "Índice",
      contribText: "Contribuições são bem-vindas! Por favor faça um fork do repositório, crie uma branch de funcionalidade e envie um pull request.",
      licenseText: (l) => `Este projeto está licenciado sob a Licença ${l}.`,
      defaultDesc: "Uma breve descrição do projeto.",
      defaultFeatures: ["Fácil de usar", "Bem documentado", "Altamente configurável"],
      madeWith: "Feito com amor por",
    },
  },
  hi: {
    name: "Hindi (हिन्दी)", direction: "ltr",
    s: {
      overview: "अवलोकन", features: "विशेषताएं", tech: "तकनीकी स्टैक",
      install: "इंस्टॉलेशन", usage: "उपयोग", contrib: "योगदान", license: "लाइसेंस",
      prerequisites: "आवश्यकताएं", projectStructure: "प्रोजेक्ट संरचना",
      tableOfContents: "विषय सूची",
      contribText: "योगदान स्वागत योग्य है! कृपया रिपॉजिटरी को फोर्क करें, एक फीचर ब्रांच बनाएं और pull request सबमिट करें।",
      licenseText: (l) => `यह प्रोजेक्ट ${l} लाइसेंस के अंतर्गत है।`,
      defaultDesc: "प्रोजेक्ट का संक्षिप्त विवरण।",
      defaultFeatures: ["उपयोग में आसान", "अच्छी तरह प्रलेखित", "उच्च कॉन्फ़िगर करने योग्य"],
      madeWith: "... द्वारा प्रेम से बनाया गया",
    },
  },
  ar: {
    name: "Arabic (العربية)", direction: "rtl",
    s: {
      overview: "نظرة عامة", features: "الميزات", tech: "التقنيات المستخدمة",
      install: "التثبيت", usage: "الاستخدام", contrib: "المساهمة", license: "الرخصة",
      prerequisites: "المتطلبات الأساسية", projectStructure: "هيكل المشروع",
      tableOfContents: "جدول المحتويات",
      contribText: "المساهمات مرحب بها! يرجى عمل fork للمستودع وإنشاء فرع للميزة وإرسال pull request.",
      licenseText: (l) => `هذا المشروع مرخص بموجب رخصة ${l}.`,
      defaultDesc: "وصف مختصر للمشروع.",
      defaultFeatures: ["سهل الاستخدام", "موثق جيداً", "قابل للتهيئة بشكل كبير"],
      madeWith: "صُنع بحب بواسطة",
    },
  },
  ru: {
    name: "Russian (Русский)", direction: "ltr",
    s: {
      overview: "Обзор", features: "Возможности", tech: "Технологии",
      install: "Установка", usage: "Использование", contrib: "Участие в разработке", license: "Лицензия",
      prerequisites: "Требования", projectStructure: "Структура проекта",
      tableOfContents: "Содержание",
      contribText: "Вклад приветствуется! Пожалуйста, сделайте fork репозитория, создайте ветку функции и отправьте pull request.",
      licenseText: (l) => `Этот проект распространяется под лицензией ${l}.`,
      defaultDesc: "Краткое описание проекта.",
      defaultFeatures: ["Простота использования", "Хорошая документация", "Высокая настраиваемость"],
      madeWith: "Сделано с любовью",
    },
  },
  ko: {
    name: "Korean (한국어)", direction: "ltr",
    s: {
      overview: "개요", features: "기능", tech: "기술 스택",
      install: "설치", usage: "사용법", contrib: "기여", license: "라이선스",
      prerequisites: "사전 요구사항", projectStructure: "프로젝트 구조",
      tableOfContents: "목차",
      contribText: "기여를 환영합니다! 저장소를 포크하고, 기능 브랜치를 만들고, 풀 리퀘스트를 제출해 주세요.",
      licenseText: (l) => `이 프로젝트는 ${l} 라이선스에 따라 배포됩니다.`,
      defaultDesc: "이 프로젝트에 대한 간략한 설명입니다.",
      defaultFeatures: ["사용하기 쉬운", "문서화 잘 됨", "고도로 구성 가능"],
      madeWith: "... 이(가) 사랑을 담아 제작",
    },
  },
  it: {
    name: "Italian (Italiano)", direction: "ltr",
    s: {
      overview: "Panoramica", features: "Funzionalità", tech: "Tecnologie Utilizzate",
      install: "Installazione", usage: "Utilizzo", contrib: "Contributi", license: "Licenza",
      prerequisites: "Prerequisiti", projectStructure: "Struttura del Progetto",
      tableOfContents: "Indice",
      contribText: "I contributi sono benvenuti! Per favore fai un fork del repository, crea un branch di funzionalità e apri una pull request.",
      licenseText: (l) => `Questo progetto è distribuito con la Licenza ${l}.`,
      defaultDesc: "Una breve descrizione del progetto.",
      defaultFeatures: ["Facile da usare", "Ben documentato", "Altamente configurabile"],
      madeWith: "Fatto con amore da",
    },
  },
  nl: {
    name: "Dutch (Nederlands)", direction: "ltr",
    s: {
      overview: "Overzicht", features: "Functies", tech: "Gebruikte Technologieën",
      install: "Installatie", usage: "Gebruik", contrib: "Bijdragen", license: "Licentie",
      prerequisites: "Vereisten", projectStructure: "Projectstructuur",
      tableOfContents: "Inhoudsopgave",
      contribText: "Bijdragen zijn welkom! Maak een fork van het repository, maak een feature branch aan en dien een pull request in.",
      licenseText: (l) => `Dit project is gelicenseerd onder de ${l} Licentie.`,
      defaultDesc: "Een korte beschrijving van het project.",
      defaultFeatures: ["Gemakkelijk te gebruiken", "Goed gedocumenteerd", "Zeer configureerbaar"],
      madeWith: "Gemaakt met liefde door",
    },
  },
  tr: {
    name: "Turkish (Türkçe)", direction: "ltr",
    s: {
      overview: "Genel Bakış", features: "Özellikler", tech: "Kullanılan Teknolojiler",
      install: "Kurulum", usage: "Kullanım", contrib: "Katkıda Bulunma", license: "Lisans",
      prerequisites: "Ön Koşullar", projectStructure: "Proje Yapısı",
      tableOfContents: "İçindekiler",
      contribText: "Katkılarınızı bekliyoruz! Lütfen repoyu fork'layın, bir özellik branch'i oluşturun ve pull request gönderin.",
      licenseText: (l) => `Bu proje ${l} Lisansı kapsamında lisanslanmıştır.`,
      defaultDesc: "Projenin kısa bir açıklaması.",
      defaultFeatures: ["Kullanımı kolay", "İyi belgelenmiş", "Yüksek düzeyde yapılandırılabilir"],
      madeWith: "... tarafından sevgiyle yapıldı",
    },
  },
  pl: {
    name: "Polish (Polski)", direction: "ltr",
    s: {
      overview: "Przegląd", features: "Funkcje", tech: "Użyte Technologie",
      install: "Instalacja", usage: "Użycie", contrib: "Wkład", license: "Licencja",
      prerequisites: "Wymagania wstępne", projectStructure: "Struktura projektu",
      tableOfContents: "Spis treści",
      contribText: "Wkłady są mile widziane! Proszę zrobić fork repozytorium, stworzyć gałąź funkcji i przesłać pull request.",
      licenseText: (l) => `Ten projekt jest objęty licencją ${l}.`,
      defaultDesc: "Krótki opis projektu.",
      defaultFeatures: ["Łatwy w użyciu", "Dobrze udokumentowany", "Wysoko konfigurowalny"],
      madeWith: "Zrobione z miłością przez",
    },
  },
};

// ── Programming Language Definitions ──────────────────────────────────────────

const PROG_LANGUAGES = {
  javascript: {
    name: "JavaScript", extension: ".js",
    runCommand: "node index.js",
    installCommand: "npm install",
    packageManager: "npm",
    buildCommand: "npm run build",
    testCommand: "npm test",
    badgeColor: "yellow",
    configFile: "package.json",
  },
  typescript: {
    name: "TypeScript", extension: ".ts",
    runCommand: "ts-node index.ts",
    installCommand: "npm install",
    packageManager: "npm",
    buildCommand: "npm run build",
    testCommand: "npm test",
    badgeColor: "blue",
    configFile: "package.json",
  },
  python: {
    name: "Python", extension: ".py",
    runCommand: "python main.py",
    installCommand: "pip install -r requirements.txt",
    packageManager: "pip",
    buildCommand: null,
    testCommand: "pytest",
    badgeColor: "blue",
    configFile: "requirements.txt",
  },
  java: {
    name: "Java", extension: ".java",
    runCommand: "java Main",
    installCommand: "mvn install",
    packageManager: "Maven",
    buildCommand: "mvn package",
    testCommand: "mvn test",
    badgeColor: "red",
    configFile: "pom.xml",
  },
  go: {
    name: "Go", extension: ".go",
    runCommand: "go run main.go",
    installCommand: "go mod tidy",
    packageManager: "Go Modules",
    buildCommand: "go build",
    testCommand: "go test ./...",
    badgeColor: "cyan",
    configFile: "go.mod",
  },
  rust: {
    name: "Rust", extension: ".rs",
    runCommand: "cargo run",
    installCommand: "cargo build",
    packageManager: "Cargo",
    buildCommand: "cargo build --release",
    testCommand: "cargo test",
    badgeColor: "orange",
    configFile: "Cargo.toml",
  },
  php: {
    name: "PHP", extension: ".php",
    runCommand: "php index.php",
    installCommand: "composer install",
    packageManager: "Composer",
    buildCommand: null,
    testCommand: "phpunit",
    badgeColor: "purple",
    configFile: "composer.json",
  },
  ruby: {
    name: "Ruby", extension: ".rb",
    runCommand: "ruby main.rb",
    installCommand: "bundle install",
    packageManager: "Bundler",
    buildCommand: null,
    testCommand: "rspec",
    badgeColor: "red",
    configFile: "Gemfile",
  },
  csharp: {
    name: "C#", extension: ".cs",
    runCommand: "dotnet run",
    installCommand: "dotnet restore",
    packageManager: "NuGet",
    buildCommand: "dotnet build",
    testCommand: "dotnet test",
    badgeColor: "green",
    configFile: "project.csproj",
  },
  cpp: {
    name: "C++", extension: ".cpp",
    runCommand: "./main",
    installCommand: "cmake ..",
    packageManager: "CMake",
    buildCommand: "make",
    testCommand: "ctest",
    badgeColor: "blue",
    configFile: "CMakeLists.txt",
  },
  kotlin: {
    name: "Kotlin", extension: ".kt",
    runCommand: "kotlinc main.kt -include-runtime -d main.jar && java -jar main.jar",
    installCommand: "gradle build",
    packageManager: "Gradle",
    buildCommand: "gradle build",
    testCommand: "gradle test",
    badgeColor: "violet",
    configFile: "build.gradle.kts",
  },
  swift: {
    name: "Swift", extension: ".swift",
    runCommand: "swift run",
    installCommand: "swift package resolve",
    packageManager: "Swift Package Manager",
    buildCommand: "swift build",
    testCommand: "swift test",
    badgeColor: "orange",
    configFile: "Package.swift",
  },
};

// ── In-Memory README Store ────────────────────────────────────────────────────
// Tracks README entries that have been explicitly saved via the API.
// Keys: auto-generated string IDs. Values: stored readme objects.

const readmeStore = new Map();
let _idCounter = 1;

function generateId() {
  return `readme_${Date.now()}_${_idCounter++}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeArray(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val.filter(Boolean);
  return String(val).split(",").map((v) => v.trim()).filter(Boolean);
}

function langFilename(langCode) {
  return langCode === "en" ? "README.md" : `README.${langCode}.md`;
}

// ── README Builders ───────────────────────────────────────────────────────────

/**
 * Build a README localized in a spoken language.
 * Optionally enriched with programming-language-specific commands.
 */
function buildReadme(langCode, p) {
  const { s } = SPOKEN_LANGUAGES[langCode];
  const prog = p.programmingLanguage ? PROG_LANGUAGES[p.programmingLanguage.toLowerCase().trim()] : null;

  const projectName = p.name || "My Project";
  const slug = projectName.toLowerCase().replace(/\s+/g, "-");
  const repo = p.repoUrl || `https://github.com/your-username/${slug}`;
  const license = p.license || "MIT";
  const version = p.version || "1.0.0";
  const author = p.author || null;
  const features = normalizeArray(p.features) || s.defaultFeatures;
  const techStack = normalizeArray(p.techStack) || (prog ? [prog.name] : []);
  const description = p.description || s.defaultDesc;

  const badgeLanguage = prog ? prog.name.replace(/\s/g, "%20").replace(/#/g, "%23") : null;
  const badgeSection = prog
    ? `![Version](https://img.shields.io/badge/version-${version}-brightgreen) ![Language](https://img.shields.io/badge/language-${badgeLanguage}-${prog.badgeColor}) ![License](https://img.shields.io/badge/license-${license}-blue)\n\n`
    : `![Version](https://img.shields.io/badge/version-${version}-brightgreen) ![License](https://img.shields.io/badge/license-${license}-blue)\n\n`;

  const installCmd = prog ? prog.installCommand : "npm install";
  const runCmd = prog ? prog.runCommand : "npm start";
  const buildCmd = prog?.buildCommand || null;
  const testCmd = prog ? prog.testCommand : "npm test";
  const ext = prog ? prog.extension : ".js";
  const configFile = prog ? prog.configFile : "package.json";

  const techSection = techStack.length
    ? `## ${s.tech}\n\n${techStack.map((t) => `- ${t}`).join("\n")}\n\n`
    : "";

  const prerequisitesSection = prog
    ? `## ${s.prerequisites}\n\n- ${prog.name} runtime/compiler installed\n- ${prog.packageManager} package manager\n\n`
    : "";

  const buildSection = buildCmd
    ? `\n\`\`\`bash\n${buildCmd}\n\`\`\`\n`
    : "";

  const toc = `## ${s.tableOfContents}\n\n- [${s.overview}](#overview)\n- [${s.features}](#features)\n${techStack.length ? `- [${s.tech}](#tech-stack)\n` : ""}- [${s.install}](#installation)\n- [${s.usage}](#usage)\n- [${s.contrib}](#contributing)\n- [${s.license}](#license)\n\n`;

  const projectStructure = `## ${s.projectStructure}\n\n\`\`\`\n${slug}/\n├── src/\n│   └── main${ext}\n├── tests/\n│   └── main.test${ext}\n├── .gitignore\n├── README.md\n└── ${configFile}\n\`\`\`\n\n`;

  const authorFooter = author
    ? `\n---\n\n${s.madeWith} [${author}](${repo})\n`
    : "";

  return `# ${projectName}

${badgeSection}> ${description}

${toc}## ${s.overview}

${description}
${prog ? `\nThis project is written in **${prog.name}** and follows best practices for code organization, readability, and maintainability.\n` : ""}
## ${s.features}

${features.map((f) => `- ${f}`).join("\n")}

${techSection}${prerequisitesSection}## ${s.install}

1. Clone the repository:

\`\`\`bash
git clone ${repo}
cd ${slug}
\`\`\`

2. Install dependencies:

\`\`\`bash
${installCmd}
\`\`\`

## ${s.usage}

\`\`\`bash
${runCmd}
\`\`\`
${buildSection}
Run tests:

\`\`\`bash
${testCmd}
\`\`\`

${projectStructure}## ${s.contrib}

${s.contribText}

1. Fork the repository
2. \`git checkout -b feature/your-feature-name\`
3. \`git commit -m 'Add some feature'\`
4. \`git push origin feature/your-feature-name\`
5. Open a Pull Request

## ${s.license}

${s.licenseText(license)}
${authorFooter}`;
}

/**
 * Build a README focused on a programming language (English only, full template).
 */
function buildProgLangReadme(langKey, p) {
  const lang = PROG_LANGUAGES[langKey];
  const projectName = p.projectName || "My Project";
  const description = p.description || `A ${lang.name} project built with modern best practices.`;
  const author = p.author || "Author";
  const license = p.license || "MIT";
  const version = p.version || "1.0.0";
  const githubUrl = p.githubUrl || `https://github.com/${author.toLowerCase().replace(/\s+/g, "")}/${projectName.toLowerCase().replace(/\s+/g, "-")}.git`;
  const featureList = p.features?.length
    ? p.features.map((f) => `- ${f}`).join("\n")
    : `- Core ${lang.name} functionality\n- Clean and modular code structure\n- Comprehensive documentation`;
  const slug = projectName.toLowerCase().replace(/\s+/g, "-");
  const badgeLanguage = lang.name.replace(/\s/g, "%20").replace(/#/g, "%23");

  let readme = `# ${projectName}

![Version](https://img.shields.io/badge/version-${version}-brightgreen)
![Language](https://img.shields.io/badge/language-${badgeLanguage}-${lang.badgeColor})
![License](https://img.shields.io/badge/license-${license}-blue)

> ${description}

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

${description}

This project is written in **${lang.name}** and follows best practices for code organization, readability, and maintainability.

## Features

${featureList}

## Prerequisites

- ${lang.name} runtime/compiler installed on your machine
- ${lang.packageManager} package manager

## Installation

1. Clone the repository:

\`\`\`bash
git clone ${githubUrl}
cd ${slug}
\`\`\`

2. Install dependencies:

\`\`\`bash
${lang.installCommand}
\`\`\`

## Usage

Run the project:

\`\`\`bash
${lang.runCommand}
\`\`\`
`;

  if (lang.buildCommand) {
    readme += `
Build the project:

\`\`\`bash
${lang.buildCommand}
\`\`\`
`;
  }

  readme += `
Run tests:

\`\`\`bash
${lang.testCommand}
\`\`\`

## Project Structure

\`\`\`
${slug}/
├── src/
│   └── main${lang.extension}
├── tests/
│   └── main.test${lang.extension}
├── .gitignore
├── README.md
└── ${lang.configFile}
\`\`\`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/your-feature-name\`
3. Commit your changes: \`git commit -m 'Add some feature'\`
4. Push to the branch: \`git push origin feature/your-feature-name\`
5. Open a Pull Request

Please make sure your code follows the existing code style and all tests pass before submitting.

## License

This project is licensed under the **${license} License** — see the [LICENSE](LICENSE) file for details.

---

Made with love by [${author}](${githubUrl})
`;

  return readme;
}

// ── Controller Exports ─────────────────────────────────────────────────────────

// GET /api/readme/languages/spoken
export const getSupportedSpokenLanguages = (req, res) => {
  res.json({
    type: "spoken",
    count: Object.keys(SPOKEN_LANGUAGES).length,
    languages: Object.entries(SPOKEN_LANGUAGES).map(([code, l]) => ({
      code,
      name: l.name,
      direction: l.direction,
    })),
  });
};

// GET /api/readme/languages/programming
export const getSupportedProgLanguages = (req, res) => {
  res.json({
    type: "programming",
    count: Object.keys(PROG_LANGUAGES).length,
    languages: Object.entries(PROG_LANGUAGES).map(([key, l]) => ({
      key,
      name: l.name,
      extension: l.extension,
      packageManager: l.packageManager,
    })),
  });
};

// GET /api/readme/languages  (returns both)
export const getSupportedLanguages = (req, res) => {
  res.json({
    spoken: {
      count: Object.keys(SPOKEN_LANGUAGES).length,
      languages: Object.entries(SPOKEN_LANGUAGES).map(([code, l]) => ({
        code, name: l.name, direction: l.direction,
      })),
    },
    programming: {
      count: Object.keys(PROG_LANGUAGES).length,
      languages: Object.entries(PROG_LANGUAGES).map(([key, l]) => ({
        key, name: l.name, extension: l.extension, packageManager: l.packageManager,
      })),
    },
  });
};

// POST /api/readme/generate
// Body: { language, name, description, features?, techStack?, repoUrl?, license?,
//         version?, author?, programmingLanguage?, format? }
// language = spoken language code (default "en")
// programmingLanguage = optional prog-lang key (e.g. "python") — enriches install/run commands
export const generateReadme = (req, res) => {
  const {
    language = "en",
    name,
    description,
    features,
    techStack,
    repoUrl = "",
    license = "MIT",
    version = "1.0.0",
    author = "",
    programmingLanguage = null,
    format = "json",
    save = false,   // set true to persist in the in-memory store for later deletion
  } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Missing required field: "name"',
      hint: 'Provide { "name": "My App", "description": "...", "language": "es" }',
    });
  }
  if (!description?.trim()) {
    return res.status(400).json({ success: false, error: 'Missing required field: "description"' });
  }

  const langCode = language.toLowerCase().trim();
  if (!SPOKEN_LANGUAGES[langCode]) {
    return res.status(404).json({
      success: false,
      error: `Spoken language code "${langCode}" is not supported.`,
      supportedCodes: Object.keys(SPOKEN_LANGUAGES),
    });
  }

  if (programmingLanguage) {
    const progKey = programmingLanguage.toLowerCase().trim();
    if (!PROG_LANGUAGES[progKey]) {
      return res.status(404).json({
        success: false,
        error: `Programming language "${programmingLanguage}" is not supported.`,
        supportedKeys: Object.keys(PROG_LANGUAGES),
      });
    }
  }

  const content = buildReadme(langCode, {
    name: name.trim(), description: description.trim(),
    features, techStack, repoUrl, license, version,
    author: author?.trim() || null, programmingLanguage,
  });

  const filename = langFilename(langCode);
  const langInfo = SPOKEN_LANGUAGES[langCode];

  if (format === "raw") {
    return res
      .setHeader("Content-Type", "text/markdown; charset=utf-8")
      .setHeader("Content-Disposition", `attachment; filename="${filename}"`)
      .send(content);
  }

  const responseBody = {
    success: true,
    spokenLanguage: { code: langCode, name: langInfo.name, direction: langInfo.direction },
    programmingLanguage: programmingLanguage
      ? { key: programmingLanguage.toLowerCase(), name: PROG_LANGUAGES[programmingLanguage.toLowerCase()].name }
      : null,
    filename,
    content,
    characterCount: content.length,
    lineCount: content.split("\n").length,
  };

  if (save) {
    const id = generateId();
    const storedAt = new Date().toISOString();
    readmeStore.set(id, {
      id,
      storedAt,
      spokenLanguage: responseBody.spokenLanguage,
      programmingLanguage: responseBody.programmingLanguage,
      filename,
      content,
      characterCount: content.length,
      lineCount: content.split("\n").length,
    });
    responseBody.id = id;
    responseBody.storedAt = storedAt;
    responseBody.saved = true;
  }

  return res.status(201).json(responseBody);
};

// POST /api/readme/generate/bulk
// Body: { languages: ["en","es","fr"], name, description, ..., programmingLanguage? }
export const generateReadmeBulk = (req, res) => {
  const {
    languages,
    name,
    description,
    features,
    techStack,
    repoUrl = "",
    license = "MIT",
    version = "1.0.0",
    author = "",
    programmingLanguage = null,
  } = req.body;

  if (!name?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });
  if (!Array.isArray(languages) || languages.length === 0) {
    return res.status(400).json({
      success: false,
      error: '"languages" must be a non-empty array of spoken language codes',
      supportedCodes: Object.keys(SPOKEN_LANGUAGES),
    });
  }

  if (programmingLanguage && !PROG_LANGUAGES[programmingLanguage.toLowerCase().trim()]) {
    return res.status(404).json({
      success: false,
      error: `Programming language "${programmingLanguage}" is not supported.`,
      supportedKeys: Object.keys(PROG_LANGUAGES),
    });
  }

  const params = {
    name: name.trim(), description: description.trim(),
    features, techStack, repoUrl, license, version,
    author: author?.trim() || null, programmingLanguage,
  };

  const results = [];
  const errors = [];

  for (const lang of languages) {
    const langCode = lang.toLowerCase().trim();
    if (!SPOKEN_LANGUAGES[langCode]) {
      errors.push({ language: lang, error: `Unsupported spoken language code: "${lang}"` });
      continue;
    }
    const content = buildReadme(langCode, params);
    const filename = langFilename(langCode);
    results.push({
      spokenLanguage: { code: langCode, name: SPOKEN_LANGUAGES[langCode].name, direction: SPOKEN_LANGUAGES[langCode].direction },
      filename,
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
    programmingLanguage: programmingLanguage
      ? { key: programmingLanguage.toLowerCase(), name: PROG_LANGUAGES[programmingLanguage.toLowerCase()].name }
      : null,
    results,
    ...(errors.length && { errors }),
  });
};

// POST /api/readme/generate/all
// Body: { name, description, ..., programmingLanguage? }
// Generates README in ALL 15 spoken languages at once.
export const generateReadmeAll = (req, res) => {
  const {
    name, description, features, techStack,
    repoUrl = "", license = "MIT", version = "1.0.0",
    author = "", programmingLanguage = null,
  } = req.body;

  if (!name?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  if (programmingLanguage && !PROG_LANGUAGES[programmingLanguage.toLowerCase().trim()]) {
    return res.status(404).json({
      success: false,
      error: `Programming language "${programmingLanguage}" is not supported.`,
      supportedKeys: Object.keys(PROG_LANGUAGES),
    });
  }

  const params = {
    name: name.trim(), description: description.trim(),
    features, techStack, repoUrl, license, version,
    author: author?.trim() || null, programmingLanguage,
  };

  const readmes = Object.keys(SPOKEN_LANGUAGES).map((langCode) => {
    const content = buildReadme(langCode, params);
    const filename = langFilename(langCode);
    return {
      spokenLanguage: { code: langCode, name: SPOKEN_LANGUAGES[langCode].name, direction: SPOKEN_LANGUAGES[langCode].direction },
      filename,
      content,
      characterCount: content.length,
      lineCount: content.split("\n").length,
    };
  });

  return res.status(201).json({
    success: true,
    count: readmes.length,
    programmingLanguage: programmingLanguage
      ? { key: programmingLanguage.toLowerCase(), name: PROG_LANGUAGES[programmingLanguage.toLowerCase()].name }
      : null,
    readmes,
  });
};

// GET /api/readme/generate/:language  (raw Markdown download, spoken language)
export const generateReadmeRaw = (req, res) => {
  const langCode = req.params.language.toLowerCase().trim();
  if (!SPOKEN_LANGUAGES[langCode]) {
    return res.status(404).json({
      success: false,
      error: `Spoken language code "${langCode}" is not supported.`,
      supportedCodes: Object.keys(SPOKEN_LANGUAGES),
    });
  }

  const name = req.query.name || "My Project";
  const description = req.query.description || SPOKEN_LANGUAGES[langCode].s.defaultDesc;
  const features = req.query.features ? req.query.features.split(",") : null;
  const techStack = req.query.techStack ? req.query.techStack.split(",") : null;
  const repoUrl = req.query.repoUrl || "";
  const license = req.query.license || "MIT";
  const version = req.query.version || "1.0.0";
  const author = req.query.author || null;
  const programmingLanguage = req.query.programmingLanguage || null;

  if (programmingLanguage && !PROG_LANGUAGES[programmingLanguage.toLowerCase().trim()]) {
    return res.status(404).json({
      success: false,
      error: `Programming language "${programmingLanguage}" is not supported.`,
      supportedKeys: Object.keys(PROG_LANGUAGES),
    });
  }

  const content = buildReadme(langCode, { name, description, features, techStack, repoUrl, license, version, author, programmingLanguage });
  const filename = langFilename(langCode);

  return res
    .setHeader("Content-Type", "text/markdown; charset=utf-8")
    .setHeader("Content-Disposition", `attachment; filename="${filename}"`)
    .send(content);
};

// POST /api/readme/generate/by-language (programming language → English README)
// Body: { programmingLanguage, projectName, description?, author?, features?,
//         license?, githubUrl?, version? }
export const generateReadmeByProgLang = (req, res) => {
  const {
    programmingLanguage,
    projectName,
    description,
    author,
    features,
    license = "MIT",
    githubUrl = "",
    version = "1.0.0",
    format = "json",
  } = req.body;

  if (!programmingLanguage?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Missing required field: "programmingLanguage"',
      supportedKeys: Object.keys(PROG_LANGUAGES),
    });
  }
  if (!projectName?.trim()) {
    return res.status(400).json({ success: false, error: 'Missing required field: "projectName"' });
  }

  const progKey = programmingLanguage.toLowerCase().trim();
  if (!PROG_LANGUAGES[progKey]) {
    return res.status(404).json({
      success: false,
      error: `Programming language "${programmingLanguage}" is not supported.`,
      supportedKeys: Object.keys(PROG_LANGUAGES),
    });
  }

  const content = buildProgLangReadme(progKey, {
    projectName: projectName.trim(),
    description: description?.trim() || null,
    author: author?.trim() || null,
    features: Array.isArray(features) ? features : [],
    license,
    githubUrl: githubUrl?.trim() || "",
    version,
  });

  if (format === "raw") {
    return res
      .setHeader("Content-Type", "text/markdown; charset=utf-8")
      .setHeader("Content-Disposition", `attachment; filename="README.md"`)
      .send(content);
  }

  return res.status(201).json({
    success: true,
    programmingLanguage: { key: progKey, name: PROG_LANGUAGES[progKey].name },
    projectName: projectName.trim(),
    filename: "README.md",
    content,
    characterCount: content.length,
    lineCount: content.split("\n").length,
  });
};

// GET /api/readme/saved
// Returns all README entries currently in the in-memory store.
export const listSavedReadmes = (req, res) => {
  const entries = Array.from(readmeStore.values()).map((entry) => ({
    id: entry.id,
    storedAt: entry.storedAt,
    filename: entry.filename,
    spokenLanguage: entry.spokenLanguage,
    programmingLanguage: entry.programmingLanguage,
    characterCount: entry.characterCount,
    lineCount: entry.lineCount,
  }));

  return res.json({
    success: true,
    count: entries.length,
    readmes: entries,
  });
};

// DELETE /api/readme/delete/:id
// Deletes a single saved README entry by its ID.
export const deleteReadmeById = (req, res) => {
  const { id } = req.params;

  if (!id?.trim()) {
    return res.status(400).json({ success: false, error: 'Missing required URL param: "id"' });
  }

  if (!readmeStore.has(id)) {
    return res.status(404).json({
      success: false,
      error: `No saved README found with id "${id}".`,
      hint: 'Use GET /api/readme/saved to list all saved README IDs.',
    });
  }

  const entry = readmeStore.get(id);
  readmeStore.delete(id);

  return res.json({
    success: true,
    message: `README "${entry.filename}" (id: ${id}) has been deleted.`,
    deleted: {
      id: entry.id,
      filename: entry.filename,
      spokenLanguage: entry.spokenLanguage,
      storedAt: entry.storedAt,
    },
    remainingCount: readmeStore.size,
  });
};

// DELETE /api/readme/delete
// Deletes ALL saved README entries from the in-memory store.
// Optionally filter by spoken language: body { language: "es" }
// Optionally filter by programming language: body { programmingLanguage: "python" }
export const deleteReadmes = (req, res) => {
  const { language, programmingLanguage } = req.body || {};

  if (!language && !programmingLanguage) {
    // Delete everything
    const count = readmeStore.size;
    readmeStore.clear();
    return res.json({
      success: true,
      message: `All ${count} saved README(s) have been deleted.`,
      deletedCount: count,
      remainingCount: 0,
    });
  }

  // Filtered delete
  const toDelete = [];
  for (const [id, entry] of readmeStore.entries()) {
    const langMatch = language
      ? entry.spokenLanguage?.code === language.toLowerCase().trim()
      : true;
    const progMatch = programmingLanguage
      ? entry.programmingLanguage?.key === programmingLanguage.toLowerCase().trim()
      : true;
    if (langMatch && progMatch) toDelete.push(id);
  }

  toDelete.forEach((id) => readmeStore.delete(id));

  return res.json({
    success: true,
    message: `Deleted ${toDelete.length} README(s) matching the specified filters.`,
    filters: {
      ...(language && { spokenLanguage: language }),
      ...(programmingLanguage && { programmingLanguage }),
    },
    deletedCount: toDelete.length,
    remainingCount: readmeStore.size,
  });
};

// GET /api/readme/generate/by-language/:progLang (convenience GET)
export const generateReadmeByProgLangRaw = (req, res) => {
  const progKey = req.params.progLang.toLowerCase().trim();
  if (!PROG_LANGUAGES[progKey]) {
    return res.status(404).json({
      success: false,
      error: `Programming language "${progKey}" is not supported.`,
      supportedKeys: Object.keys(PROG_LANGUAGES),
    });
  }

  const projectName = req.query.projectName || req.query.name || "My Project";
  const description = req.query.description || null;
  const author = req.query.author || "Author";
  const features = req.query.features ? req.query.features.split(",") : [];
  const license = req.query.license || "MIT";
  const githubUrl = req.query.githubUrl || req.query.repoUrl || "";
  const version = req.query.version || "1.0.0";

  const content = buildProgLangReadme(progKey, { projectName, description, author, features, license, githubUrl, version });

  return res
    .setHeader("Content-Type", "text/markdown; charset=utf-8")
    .setHeader("Content-Disposition", `attachment; filename="README.md"`)
    .send(content);
};
