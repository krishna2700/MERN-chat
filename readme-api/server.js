const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Language configs ──────────────────────────────────────────────────────
const LANGUAGE_CONFIGS = {
  python: {
    label: 'Python',
    installCmd: 'pip install <package-name>',
    runCmd: 'python main.py',
    testCmd: 'pytest',
    extension: '.py',
    shebang: '#!/usr/bin/env python3',
    badgeColor: '3776AB',
    badgeLogo: 'python',
    sampleImport: 'import os',
    sampleMain: 'if __name__ == "__main__":\n    print("Hello, World!")',
  },
  javascript: {
    label: 'JavaScript',
    installCmd: 'npm install',
    runCmd: 'node index.js',
    testCmd: 'npm test',
    extension: '.js',
    shebang: '#!/usr/bin/env node',
    badgeColor: 'F7DF1E',
    badgeLogo: 'javascript',
    sampleImport: 'const fs = require("fs");',
    sampleMain: 'console.log("Hello, World!");',
  },
  typescript: {
    label: 'TypeScript',
    installCmd: 'npm install',
    runCmd: 'npx ts-node index.ts',
    testCmd: 'npm test',
    extension: '.ts',
    shebang: '',
    badgeColor: '3178C6',
    badgeLogo: 'typescript',
    sampleImport: 'import * as fs from "fs";',
    sampleMain: 'const greet = (name: string): string => `Hello, ${name}!`;\nconsole.log(greet("World"));',
  },
  java: {
    label: 'Java',
    installCmd: 'mvn install',
    runCmd: 'java -jar app.jar',
    testCmd: 'mvn test',
    extension: '.java',
    shebang: '',
    badgeColor: 'ED8B00',
    badgeLogo: 'java',
    sampleImport: 'import java.util.*;',
    sampleMain: 'public static void main(String[] args) {\n    System.out.println("Hello, World!");\n}',
  },
  go: {
    label: 'Go',
    installCmd: 'go mod download',
    runCmd: 'go run main.go',
    testCmd: 'go test ./...',
    extension: '.go',
    shebang: '',
    badgeColor: '00ADD8',
    badgeLogo: 'go',
    sampleImport: 'import "fmt"',
    sampleMain: 'func main() {\n    fmt.Println("Hello, World!")\n}',
  },
  rust: {
    label: 'Rust',
    installCmd: 'cargo build',
    runCmd: 'cargo run',
    testCmd: 'cargo test',
    extension: '.rs',
    shebang: '',
    badgeColor: '000000',
    badgeLogo: 'rust',
    sampleImport: 'use std::io;',
    sampleMain: 'fn main() {\n    println!("Hello, World!");\n}',
  },
  ruby: {
    label: 'Ruby',
    installCmd: 'bundle install',
    runCmd: 'ruby main.rb',
    testCmd: 'bundle exec rspec',
    extension: '.rb',
    shebang: '#!/usr/bin/env ruby',
    badgeColor: 'CC342D',
    badgeLogo: 'ruby',
    sampleImport: 'require "json"',
    sampleMain: 'puts "Hello, World!"',
  },
  php: {
    label: 'PHP',
    installCmd: 'composer install',
    runCmd: 'php index.php',
    testCmd: 'phpunit',
    extension: '.php',
    shebang: '<?php',
    badgeColor: '777BB4',
    badgeLogo: 'php',
    sampleImport: 'require_once "vendor/autoload.php";',
    sampleMain: 'echo "Hello, World!\\n";',
  },
  csharp: {
    label: 'C#',
    installCmd: 'dotnet restore',
    runCmd: 'dotnet run',
    testCmd: 'dotnet test',
    extension: '.cs',
    shebang: '',
    badgeColor: '239120',
    badgeLogo: 'csharp',
    sampleImport: 'using System;',
    sampleMain: 'static void Main(string[] args) {\n    Console.WriteLine("Hello, World!");\n}',
  },
  cpp: {
    label: 'C++',
    installCmd: 'cmake .. && make',
    runCmd: './app',
    testCmd: 'ctest',
    extension: '.cpp',
    shebang: '',
    badgeColor: '00599C',
    badgeLogo: 'cplusplus',
    sampleImport: '#include <iostream>',
    sampleMain: 'int main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  },
  kotlin: {
    label: 'Kotlin',
    installCmd: 'gradle build',
    runCmd: 'gradle run',
    testCmd: 'gradle test',
    extension: '.kt',
    shebang: '',
    badgeColor: '7F52FF',
    badgeLogo: 'kotlin',
    sampleImport: 'import kotlin.collections.*',
    sampleMain: 'fun main() {\n    println("Hello, World!")\n}',
  },
  swift: {
    label: 'Swift',
    installCmd: 'swift package resolve',
    runCmd: 'swift run',
    testCmd: 'swift test',
    extension: '.swift',
    shebang: '',
    badgeColor: 'FA7343',
    badgeLogo: 'swift',
    sampleImport: 'import Foundation',
    sampleMain: 'print("Hello, World!")',
  },
};

// ─── README builder ────────────────────────────────────────────────────────
function buildReadme({
  projectName,
  description,
  language,
  author,
  license,
  features,
  prerequisites,
  envVars,
  includeContributing,
  includeChangelog,
  githubUser,
  repoName,
}) {
  const cfg = LANGUAGE_CONFIGS[language.toLowerCase()];
  if (!cfg) throw new Error(`Unsupported language: ${language}`);

  const repo = repoName || projectName.toLowerCase().replace(/\s+/g, '-');
  const ghUser = githubUser || 'your-username';
  const badgeBase = `https://img.shields.io/badge`;
  const langBadge = `![${cfg.label}](${badgeBase}/${cfg.label}-${cfg.badgeColor}?style=for-the-badge&logo=${cfg.badgeLogo}&logoColor=white)`;
  const licenseBadge = `![License](${badgeBase}/License-${license || 'MIT'}-green?style=for-the-badge)`;

  const featureList = Array.isArray(features) && features.length
    ? features.map(f => `- ${f}`).join('\n')
    : `- Core functionality in ${cfg.label}\n- Easy to set up and extend\n- Well-structured codebase`;

  const prereqList = Array.isArray(prerequisites) && prerequisites.length
    ? prerequisites.map(p => `- ${p}`).join('\n')
    : `- ${cfg.label} runtime / compiler installed\n- Git`;

  const envSection = Array.isArray(envVars) && envVars.length
    ? `\n## Environment Variables\n\nCreate a \`.env\` file in the root directory:\n\n\`\`\`env\n${envVars.map(e => `${e}=your_value_here`).join('\n')}\n\`\`\`\n`
    : '';

  const contributingSection = includeContributing ? `
## Contributing

Contributions are always welcome!

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

Please make sure to update tests as appropriate.
` : '';

  const changelogSection = includeChangelog ? `
## Changelog

### [Unreleased]
- Initial release

### [1.0.0] - ${new Date().toISOString().split('T')[0]}
- First stable version
` : '';

  const codeBlock = cfg.shebang
    ? `\`\`\`${language.toLowerCase()}\n${cfg.shebang}\n${cfg.sampleImport}\n\n${cfg.sampleMain}\n\`\`\``
    : `\`\`\`${language.toLowerCase()}\n${cfg.sampleImport}\n\n${cfg.sampleMain}\n\`\`\``;

  return `# ${projectName}

${langBadge} ${licenseBadge}

> ${description || `A ${cfg.label} project.`}

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)${envVars && envVars.length ? '\n- [Environment Variables](#environment-variables)' : ''}
- [License](#license)${includeContributing ? '\n- [Contributing](#contributing)' : ''}${includeChangelog ? '\n- [Changelog](#changelog)' : ''}

---

## Features

${featureList}

---

## Prerequisites

${prereqList}

---

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/${ghUser}/${repo}.git
cd ${repo}
\`\`\`

2. Install dependencies:
\`\`\`bash
${cfg.installCmd}
\`\`\`
${envSection}
---

## Usage

Run the project:
\`\`\`bash
${cfg.runCmd}
\`\`\`

Run tests:
\`\`\`bash
${cfg.testCmd}
\`\`\`

### Example

${codeBlock}

---

## Project Structure

\`\`\`
${repo}/
├── src/
│   └── main${cfg.extension}
├── tests/
│   └── test_main${cfg.extension}
├── README.md
└── ${language === 'python' ? 'requirements.txt' : language === 'javascript' || language === 'typescript' ? 'package.json' : language === 'go' ? 'go.mod' : language === 'rust' ? 'Cargo.toml' : 'config'}
\`\`\`

---
${contributingSection}${changelogSection}
## License

This project is licensed under the **${license || 'MIT'} License** — see the [LICENSE](LICENSE) file for details.

---

Made with love by [${author || ghUser}](https://github.com/${ghUser})
`;
}

// ─── Routes ────────────────────────────────────────────────────────────────

// GET /languages — list all supported languages
app.get('/languages', (req, res) => {
  const langs = Object.entries(LANGUAGE_CONFIGS).map(([key, cfg]) => ({
    id: key,
    label: cfg.label,
    extension: cfg.extension,
    runCmd: cfg.runCmd,
  }));
  res.json({ success: true, count: langs.length, languages: langs });
});

// POST /generate — generate a README
app.post('/generate', (req, res) => {
  try {
    const {
      projectName,
      description,
      language,
      author,
      license = 'MIT',
      features,
      prerequisites,
      envVars,
      includeContributing = true,
      includeChangelog = false,
      githubUser,
      repoName,
    } = req.body;

    if (!projectName) return res.status(400).json({ success: false, error: '`projectName` is required.' });
    if (!language)    return res.status(400).json({ success: false, error: '`language` is required.' });

    const lowerLang = language.toLowerCase();
    if (!LANGUAGE_CONFIGS[lowerLang]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language "${language}". Supported: ${Object.keys(LANGUAGE_CONFIGS).join(', ')}`,
      });
    }

    const readme = buildReadme({
      projectName, description, language: lowerLang, author, license,
      features, prerequisites, envVars, includeContributing, includeChangelog,
      githubUser, repoName,
    });

    res.json({
      success: true,
      language: LANGUAGE_CONFIGS[lowerLang].label,
      projectName,
      readme,
      charCount: readme.length,
      lineCount: readme.split('\n').length,
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /generate — generate via query params (quick mode)
app.get('/generate', (req, res) => {
  try {
    const {
      projectName = 'My Project',
      language = 'python',
      description,
      author,
      license,
      githubUser,
    } = req.query;

    const lowerLang = language.toLowerCase();
    if (!LANGUAGE_CONFIGS[lowerLang]) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language "${language}". Supported: ${Object.keys(LANGUAGE_CONFIGS).join(', ')}`,
      });
    }

    const readme = buildReadme({ projectName, description, language: lowerLang, author, license, githubUser });
    res.json({ success: true, language: LANGUAGE_CONFIGS[lowerLang].label, projectName, readme });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET / — API docs
app.get('/', (req, res) => {
  res.json({
    name: 'README Generator API',
    version: '1.0.0',
    description: 'Generate professional README.md files for any programming language.',
    endpoints: {
      'GET /': 'API documentation',
      'GET /languages': 'List all supported languages',
      'GET /generate?projectName=&language=&description=&author=&license=&githubUser=': 'Quick README generation via query params',
      'POST /generate': {
        description: 'Full README generation with all options',
        body: {
          projectName: 'string (required)',
          language: 'string (required) — see GET /languages for valid values',
          description: 'string',
          author: 'string',
          license: 'string (default: MIT)',
          features: 'string[]',
          prerequisites: 'string[]',
          envVars: 'string[] — variable names to include in .env section',
          includeContributing: 'boolean (default: true)',
          includeChangelog: 'boolean (default: false)',
          githubUser: 'string',
          repoName: 'string',
        },
      },
    },
    supportedLanguages: Object.keys(LANGUAGE_CONFIGS),
  });
});

// ─── Start ─────────────────────────────────────────────────────────────────
const PORT = 3456;
app.listen(PORT, () => {
  console.log(`README Generator API running on http://localhost:${PORT}`);
});
