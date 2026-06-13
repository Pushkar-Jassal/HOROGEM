import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

// Markdown parser implementation
function parseMarkdown(md) {
  // Escape HTML characters first
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Restore blockquote tag representation
  html = html.replace(/&gt;\s*\[!(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]/g, '<blockquote><strong>[$1]</strong>');
  
  // Custom blockquote parsing line by line
  const lines = html.split('\n');
  let inBlockquote = false;
  let blockquoteText = [];
  let parsedLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.trim().startsWith('&gt;')) {
      inBlockquote = true;
      blockquoteText.push(line.trim().substring(4).trim());
    } else {
      if (inBlockquote) {
        let content = blockquoteText.join(' ');
        let alertClass = 'note';
        let alertMatch = content.match(/^\[(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]/i);
        if (alertMatch) {
          alertClass = alertMatch[1].toLowerCase();
          content = content.replace(/^\[(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]\s*/i, '');
        }
        parsedLines.push(`<div class="alert alert-${alertClass}"><strong>${alertClass.toUpperCase()}:</strong> ${content}</div>`);
        blockquoteText = [];
        inBlockquote = false;
      }
      parsedLines.push(line);
    }
  }
  if (inBlockquote) {
    let content = blockquoteText.join(' ');
    let alertClass = 'note';
    let alertMatch = content.match(/^\[(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]/i);
    if (alertMatch) {
      alertClass = alertMatch[1].toLowerCase();
      content = content.replace(/^\[(IMPORTANT|NOTE|WARNING|TIP|CAUTION)\]\s*/i, '');
    }
    parsedLines.push(`<div class="alert alert-${alertClass}"><strong>${alertClass.toUpperCase()}:</strong> ${content}</div>`);
  }

  html = parsedLines.join('\n');

  // Code blocks: ```ts ... ```
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Lists
  const listLines = html.split('\n');
  let inList = false;
  let outputLines = [];

  for (let i = 0; i < listLines.length; i++) {
    let line = listLines[i];
    let listMatch = line.match(/^[-*+]\s+(.+)$/);
    if (listMatch) {
      if (!inList) {
        outputLines.push('<ul>');
        inList = true;
      }
      let content = listMatch[1];
      if (content.startsWith('[x]') || content.startsWith('[X]')) {
        content = '<input type="checkbox" checked disabled class="task-checkbox"> ' + content.substring(3).trim();
      } else if (content.startsWith('[ ]')) {
        content = '<input type="checkbox" disabled class="task-checkbox"> ' + content.substring(3).trim();
      }
      outputLines.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        outputLines.push('</ul>');
        inList = false;
      }
      outputLines.push(line);
    }
  }
  if (inList) {
    outputLines.push('</ul>');
  }
  html = outputLines.join('\n');

  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Links conversion: remove absolute file schemes links for print readability
  html = html.replace(/\[([^\]]+)\]\(file:\/\/\/[^\)]+\)/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Paragraph blocks splitting
  const blocks = html.split(/\n\s*\n/);
  const parsedBlocks = blocks.map(block => {
    let trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || 
        trimmed.startsWith('<pre') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<div class="alert"') || 
        trimmed.startsWith('<hr') || 
        trimmed.startsWith('<blockquote>')) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  });

  return parsedBlocks.join('\n');
}

// Read the files
const projectNotesMd = fs.readFileSync('PROJECT_NOTES.md', 'utf8');
const aiUsageMd = fs.readFileSync('AI_USAGE.md', 'utf8');

const projectNotesHtml = parseMarkdown(projectNotesMd);
const aiUsageHtml = parseMarkdown(aiUsageMd);

const finalHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HOROGEM: Project Notes & AI Usage</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 25mm 20mm 25mm 20mm;
      @bottom-right {
        content: counter(page);
      }
    }
    body {
      font-family: 'Inter', sans-serif;
      color: #2f3542;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-size: 14px;
    }
    .header-doc {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 3px double #FF7F32;
    }
    .header-doc .logo {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 2.8em;
      letter-spacing: 2px;
      color: #d35400;
      margin: 0;
    }
    .header-doc .subtitle {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2em;
      color: #8e44ad;
      margin-top: 6px;
      font-weight: 600;
    }
    .header-doc .meta {
      font-size: 0.85rem;
      color: #747d8c;
      margin-top: 16px;
    }
    h1, h2, h3, h4 {
      font-family: 'Outfit', sans-serif;
      color: #111111;
      font-weight: 700;
      margin-top: 1.6em;
      margin-bottom: 0.6em;
      page-break-after: avoid;
    }
    h1 {
      color: #d35400;
      border-bottom: 2px solid #FF7F32;
      padding-bottom: 8px;
      font-size: 1.9em;
    }
    h2 {
      color: #57606f;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      padding-bottom: 6px;
      font-size: 1.4em;
    }
    h3 {
      color: #8e44ad;
      font-size: 1.15em;
    }
    p {
      margin-top: 0;
      margin-bottom: 1.2em;
      text-align: justify;
    }
    ul {
      margin-top: 0;
      margin-bottom: 1.2em;
      padding-left: 24px;
    }
    li {
      margin-bottom: 0.5em;
    }
    code {
      font-family: 'Courier New', Courier, monospace;
      background-color: #f1f2f6;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.85em;
      color: #c0392b;
    }
    pre {
      background-color: #f8f9fa;
      padding: 14px;
      border-radius: 8px;
      overflow-x: auto;
      border: 1px solid #e9ecef;
      margin-bottom: 1.2em;
      page-break-inside: avoid;
    }
    pre code {
      background-color: transparent;
      padding: 0;
      border-radius: 0;
      font-size: 0.85em;
      color: #2f3542;
    }
    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 1.2em;
      font-size: 0.9rem;
      border-left: 4px solid #747d8c;
      background-color: #f1f2f6;
      page-break-inside: avoid;
    }
    .alert-important {
      border-left-color: #e74c3c;
      background-color: #fadbd8;
      color: #78281f;
    }
    .alert-warning {
      border-left-color: #f39c12;
      background-color: #fdebd0;
      color: #7e5109;
    }
    .alert-note {
      border-left-color: #3498db;
      background-color: #ebf5fb;
      color: #1b4f72;
    }
    .alert-tip {
      border-left-color: #2ecc71;
      background-color: #e8f8f5;
      color: #0e6251;
    }
    .task-checkbox {
      vertical-align: middle;
      margin-right: 6px;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- Cover Header -->
  <div class="header-doc">
    <div class="logo">HOROGEM</div>
    <div class="subtitle">Vedic Astrology CRM & Recommendation Suite</div>
    <div class="meta">
      <strong>TECHNICAL PROJECT NOTES & AI USAGE DOCUMENTATION</strong><br>
      Generated on: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}<br>
      System Version: 1.0.0 (Bilingual Mobile-Responsive Core)
    </div>
  </div>

  <!-- Section 1: Project Notes -->
  <div class="section">
    ${projectNotesHtml}
  </div>

  <!-- Page Break -->
  <div class="page-break"></div>

  <!-- Section 2: AI Usage -->
  <div class="section">
    ${aiUsageHtml}
  </div>

</body>
</html>
`;

const tempHtmlPath = path.resolve('temp_print.html');
const outputPdfPath = path.resolve('PROJECT_NOTES_AND_AI_USAGE.pdf');

fs.writeFileSync(tempHtmlPath, finalHtmlContent);

console.log('Generating PDF via headless Chrome Application print interface...');

const chromeCmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless --disable-gpu --print-to-pdf="${outputPdfPath}" "${tempHtmlPath}"`;

exec(chromeCmd, (error, stdout, stderr) => {
  // Clean up temporary HTML file
  try {
    fs.unlinkSync(tempHtmlPath);
  } catch (e) {}

  if (error) {
    console.error(`Error printing PDF: ${error.message}`);
    process.exit(1);
  }
  console.log(`Success! PDF successfully compiled at:\n${outputPdfPath}`);
});
