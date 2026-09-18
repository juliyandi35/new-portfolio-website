// Fetches the public repo catalog for github.com/juliyandi35, derives the
// method-family / application taxonomy each repo already carries in its own
// description, and writes data/manifest.json. Falls back to the previously
// committed manifest if the GitHub API is unreachable or rate-limited, so a
// build never fails purely because of a transient network/API issue.
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '..', 'data', 'manifest.json');
const USERNAME = 'juliyandi35';
const token = process.env.GITHUB_TOKEN;

function parseTaxonomy(description) {
  if (!description) return null;
  const parts = description
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return null;
  const applications = parts[parts.length - 1]
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);
  const methods = parts.slice(0, -1);
  if (methods.length === 0 || applications.length === 0) return null;
  return { methods, applications };
}

async function fetchAllRepos() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const all = [];
  for (let page = 1; page <= 10; page += 1) {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&type=owner&sort=full_name`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

function buildManifest(rawRepos) {
  const repos = [];
  let excluded = 0;
  const methodSet = new Set();
  const appSet = new Set();

  for (const raw of rawRepos) {
    if (raw.fork || raw.archived) continue;
    const taxonomy = parseTaxonomy(raw.description);
    if (!taxonomy) {
      excluded += 1;
      continue;
    }
    taxonomy.methods.forEach((m) => methodSet.add(m));
    taxonomy.applications.forEach((a) => appSet.add(a));
    repos.push({
      name: raw.name,
      slug: raw.name,
      url: raw.html_url,
      methods: taxonomy.methods,
      applications: taxonomy.applications,
      pushedAt: raw.pushed_at,
    });
  }

  repos.sort((a, b) => a.name.localeCompare(b.name));

  return {
    generatedAt: new Date().toISOString(),
    totalRepos: repos.length,
    repos,
    methodFamilies: Array.from(methodSet).sort(),
    applications: Array.from(appSet).sort(),
    excluded,
  };
}

async function main() {
  try {
    const rawRepos = await fetchAllRepos();
    const manifest = buildManifest(rawRepos);
    await writeFile(OUT_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
    console.log(
      `manifest: ${manifest.totalRepos} repos, ${manifest.methodFamilies.length} method families, ${manifest.applications.length} applications (${manifest.excluded} excluded, no taxonomy)`,
    );
  } catch (err) {
    console.warn(`build-manifest: live fetch failed (${err.message}); falling back to committed data/manifest.json`);
    try {
      await readFile(OUT_PATH, 'utf-8');
      console.log('build-manifest: existing manifest kept as-is');
    } catch {
      throw new Error('No live data and no committed data/manifest.json to fall back to.');
    }
  }
}

main();
