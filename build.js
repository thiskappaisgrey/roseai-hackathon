#!/usr/bin/env node
/**
 * Rosewood Guest Experience — Template Builder
 *
 * Usage:
 *   node build.js [guest-data.json] [--out output.html]
 *
 * Reads template.html + guest data JSON, renders to index.html (or custom output).
 * Zero dependencies — uses only Node.js built-in modules.
 */

const fs = require('fs');
const path = require('path');

// ---- Parse CLI args ----
const args = process.argv.slice(2);
let dataFile = 'guest-data.example.json';
let outFile = 'index.html';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out' && args[i + 1]) {
    outFile = args[++i];
  } else if (!args[i].startsWith('--')) {
    dataFile = args[i];
  }
}

// ---- Load files ----
const templatePath = path.join(__dirname, 'template.html');
const dataPath = path.join(__dirname, dataFile);

if (!fs.existsSync(templatePath)) {
  console.error('\u274c template.html not found in', __dirname);
  process.exit(1);
}
if (!fs.existsSync(dataPath)) {
  console.error('\u274c Data file not found:', dataPath);
  console.error('  Copy guest-data.example.json and fill in guest details.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// ---- Template engine ----

/**
 * Resolve a dot-separated path against a data object.
 * e.g. resolve(data, 'hotel.name') → data.hotel.name
 */
function resolve(obj, dotPath) {
  return dotPath.split('.').reduce((o, key) => (o != null ? o[key] : undefined), obj);
}

/**
 * Render a template string with the given data.
 *
 * Supported syntax:
 *   {{path.to.value}}                 — variable substitution
 *   {{#path.to.array}} ... {{/path.to.array}} — loop
 *   {{.property}}                      — current item property inside a loop
 */
function render(tmpl, ctx) {
  // 1. Handle loops (can be nested — process inner-most first via regex)
  //    We use a non-greedy match for the body so nested loops work level by level.
  let prev;
  do {
    prev = tmpl;
    tmpl = tmpl.replace(
      /\{\{#([\w.]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g,
      (_, arrayPath, innerTemplate) => {
        const arr = resolve(ctx, arrayPath);
        if (!Array.isArray(arr)) {
          console.warn(`\u26a0\ufe0f  Warning: "${arrayPath}" is not an array — skipping loop.`);
          return '';
        }
        return arr.map(item => {
          // Replace {{.prop}} with item.prop
          let rendered = innerTemplate.replace(
            /\{\{\.([\w]+)\}\}/g,
            (_, key) => (item[key] != null ? String(item[key]) : '')
          );
          // Replace {{.}} for plain string arrays
          rendered = rendered.replace(
            /\{\{\.\}\}/g,
            typeof item === 'string' ? item : ''
          );
          return rendered;
        }).join('');
      }
    );
  } while (tmpl !== prev); // keep going until no more loops to expand

  // 2. Handle simple variable substitution
  tmpl = tmpl.replace(
    /\{\{([\w.]+)\}\}/g,
    (_, dotPath) => {
      const val = resolve(ctx, dotPath);
      if (val === undefined) {
        console.warn(`\u26a0\ufe0f  Warning: "${dotPath}" not found in data — leaving blank.`);
        return '';
      }
      return String(val);
    }
  );

  return tmpl;
}

// ---- Build ----
const output = render(template, data);
const outPath = path.join(__dirname, outFile);
fs.writeFileSync(outPath, output, 'utf8');

console.log(`\u2705 Built ${outFile} from template + ${dataFile}`);
console.log(`   Guest: ${data.guest?.name || '(unknown)'}`);
console.log(`   Hotel: ${data.hotel?.name || ''} ${data.hotel?.property || ''}`);
console.log(`   Output: ${outPath}`);
