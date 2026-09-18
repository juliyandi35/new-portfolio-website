import { describe, it, expect } from 'vitest';
import { flagshipProjects } from '@/lib/content';
import manifest from '@/data/manifest.json';

describe('flagship projects integrity', () => {
  const repoSlugs = new Set(manifest.repos.map((r) => r.slug));

  it('every flagship project slug exists in the real manifest', () => {
    for (const project of flagshipProjects) {
      expect(repoSlugs.has(project.slug)).toBe(true);
    }
  });

  it('has no duplicate flagship slugs', () => {
    const slugs = flagshipProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('manifest data', () => {
  it('matches the verified catalog scale', () => {
    expect(manifest.totalRepos).toBe(301);
    expect(manifest.methodFamilies.length).toBe(13);
    expect(manifest.applications.length).toBe(16);
  });
});
