import { describe, it, expect } from 'vitest';
import { parseTaxonomy, buildManifest, type RawRepo } from '@/lib/manifestParser';

describe('parseTaxonomy', () => {
  it('parses a single method family with one application', () => {
    expect(parseTaxonomy('Regresi, korelasi & ekonometrika | R / RStudio')).toEqual({
      methods: ['Regresi, korelasi & ekonometrika'],
      applications: ['R / RStudio'],
    });
  });

  it('parses one method family with two comma-separated applications', () => {
    expect(parseTaxonomy('Spasial, geografis & GIS | R / RStudio, QGIS')).toEqual({
      methods: ['Spasial, geografis & GIS'],
      applications: ['R / RStudio', 'QGIS'],
    });
  });

  it('parses two method families with one application', () => {
    expect(
      parseTaxonomy('Machine learning, AI & data mining | MCDM, optimasi & riset operasi | Python'),
    ).toEqual({
      methods: ['Machine learning, AI & data mining', 'MCDM, optimasi & riset operasi'],
      applications: ['Python'],
    });
  });

  it('returns null for missing or untagged descriptions', () => {
    expect(parseTaxonomy(null)).toBeNull();
    expect(parseTaxonomy('just a plain description')).toBeNull();
  });
});

describe('buildManifest', () => {
  const raw: RawRepo[] = [
    {
      name: 'a',
      full_name: 'user/a',
      html_url: 'https://github.com/user/a',
      description: 'Deret waktu & peramalan | R / RStudio',
      fork: false,
      archived: false,
      pushed_at: '2026-01-01T00:00:00Z',
      language: 'R',
    },
    {
      name: 'b-untagged',
      full_name: 'user/b-untagged',
      html_url: 'https://github.com/user/b-untagged',
      description: 'no taxonomy here',
      fork: false,
      archived: false,
      pushed_at: '2026-01-01T00:00:00Z',
      language: null,
    },
    {
      name: 'c-fork',
      full_name: 'user/c-fork',
      html_url: 'https://github.com/user/c-fork',
      description: 'Deret waktu & peramalan | R / RStudio',
      fork: true,
      archived: false,
      pushed_at: '2026-01-01T00:00:00Z',
      language: 'R',
    },
  ];

  it('keeps only non-fork, non-archived, taxonomy-tagged repos', () => {
    const manifest = buildManifest(raw);
    expect(manifest.totalRepos).toBe(1);
    expect(manifest.repos[0].name).toBe('a');
    expect(manifest.excluded).toBe(1);
    expect(manifest.methodFamilies).toEqual(['Deret waktu & peramalan']);
  });
});
