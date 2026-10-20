#!/usr/bin/env node
// Revisa una wiki: links relativos rotos, rutas absolutas, carpetas sin índice y archivos vacíos.
// No modifica nada. Sale con código 1 si encuentra problemas.
// Uso: node check-wiki.mjs [carpeta-de-la-wiki]
import fs from 'node:fs';
import path from 'node:path';

const wiki = path.resolve(process.argv[2] || '.');
const skip = new Set(['.git', '.obsidian', '.claude', 'node_modules', '_archive']);
const problems = { 'link roto': [], 'ruta absoluta': [], 'carpeta sin índice': [], 'archivo vacío': [] };
const rel = p => path.relative(wiki, p) || '.';

// Una carpeta de agente (AGENTE/AGENTE.md) o de skill (SKILL.md) se indexa con ese archivo,
// y sus subcarpetas no necesitan índice propio.
function walk(dir, indexed) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const names = entries.map(e => e.name);
  const base = path.basename(dir);
  const ownsSubtree = names.includes('SKILL.md') || names.includes(`${base}.md`);
  if (!indexed && !ownsSubtree && !names.includes(`_${base}.md`)) {
    problems['carpeta sin índice'].push(rel(dir));
  }
  for (const e of entries) {
    if (skip.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, indexed || ownsSubtree);
    else if (e.name.endsWith('.md')) checkFile(p);
  }
}

function checkFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  if (!raw.trim()) return problems['archivo vacío'].push(rel(file));
  if (file.split(path.sep).includes('templates')) return;

  const text = raw.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const links = [...text.matchAll(/\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g)].map(m => m[1]);
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const fmPaths = [...frontmatter.matchAll(/^\s*-?\s*path:\s*"([^"]+)"/gm)].map(m => m[1]);

  for (const [link, fromFrontmatter] of [...links.map(l => [l, false]), ...fmPaths.map(l => [l, true])]) {
    if (/^(https?:|mailto:|#)/.test(link)) continue;
    if (/^(file:|\/|[A-Za-z]:\\)/.test(link)) {
      problems['ruta absoluta'].push(`${rel(file)} → ${link}`);
      continue;
    }
    let target;
    try { target = decodeURIComponent(link.split('#')[0]); } catch { target = link.split('#')[0]; }
    // Los path: de domains: son relativos a la raíz de la wiki; los demás, al archivo.
    const bases = fromFrontmatter ? [path.dirname(file), wiki] : [path.dirname(file)];
    const found = bases.some(base => fs.existsSync(path.resolve(base, target)));
    if (!found) problems['link roto'].push(`${rel(file)} → ${link}`);
  }
}

walk(wiki, false);

let total = 0;
for (const [kind, list] of Object.entries(problems)) {
  if (!list.length) continue;
  total += list.length;
  console.log(`\n${kind} (${list.length})`);
  for (const item of list) console.log(`  ${item}`);
}
console.log(total ? `\n${total} problema(s) en ${wiki}` : `Sin problemas en ${wiki}`);
process.exit(total ? 1 : 0);
