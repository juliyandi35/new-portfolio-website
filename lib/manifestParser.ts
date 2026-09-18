export interface RawRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  language: string | null;
}

export interface Repo {
  name: string;
  slug: string;
  url: string;
  methods: string[];
  applications: string[];
  pushedAt: string;
}

export interface Manifest {
  generatedAt: string;
  totalRepos: number;
  repos: Repo[];
  methodFamilies: string[];
  applications: string[];
  excluded: number;
}

/**
 * Each repo on github.com/juliyandi35 carries its own taxonomy in its
 * description: "<method family>[ | <second method family>] | <application(s)>".
 * Applications are comma-separated within the final segment; method-family
 * names may themselves contain commas, so only " | " is a field separator.
 */
export function parseTaxonomy(description: string | null): { methods: string[]; applications: string[] } | null {
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

export function buildManifest(rawRepos: RawRepo[]): Manifest {
  const repos: Repo[] = [];
  let excluded = 0;
  const methodSet = new Set<string>();
  const appSet = new Set<string>();

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
