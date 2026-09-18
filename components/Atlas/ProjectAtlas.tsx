'use client';

import { useMemo, useState } from 'react';
import manifest from '@/data/manifest.json';
import type { Repo } from '@/lib/manifestParser';

const PAGE_SIZE = 24;

export default function ProjectAtlas() {
  const [query, setQuery] = useState('');
  const [method, setMethod] = useState('all');
  const [application, setApplication] = useState('all');
  const [page, setPage] = useState(1);

  const repos = manifest.repos as Repo[];

  const applicationCounts = useMemo(
    () =>
      new Map(manifest.applications.map((a) => [a, repos.filter((r) => r.applications.includes(a)).length])),
    [repos],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q)) return false;
      if (method !== 'all' && !r.methods.includes(method)) return false;
      if (application !== 'all' && !r.applications.includes(application)) return false;
      return true;
    });
  }, [repos, query, method, application]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetPage() {
    setPage(1);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <label className="flex-1">
          <span className="sr-only">Search repositories</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder="Search 301 repositories by name"
            className="w-full rounded-md border border-ink-900/15 bg-paper px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/65 focus:border-tarum focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-900/65">Method</span>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              resetPage();
            }}
            className="rounded-md border border-ink-900/15 bg-paper px-3 py-2 text-sm text-ink-900 focus:border-tarum focus:outline-none"
          >
            <option value="all">All</option>
            {manifest.methodFamilies.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-900/65">Tool</span>
          <select
            value={application}
            onChange={(e) => {
              setApplication(e.target.value);
              resetPage();
            }}
            className="rounded-md border border-ink-900/15 bg-paper px-3 py-2 text-sm text-ink-900 focus:border-tarum focus:outline-none"
          >
            <option value="all">All</option>
            {manifest.applications.map((a) => (
              <option key={a} value={a}>
                {a} ({applicationCounts.get(a) ?? 0})
              </option>
            ))}
          </select>
        </label>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-900/65">
        {filtered.length} of {manifest.totalRepos} repositories
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((repo) => (
          <li key={repo.slug} className="border-b border-ink-900/10 pb-3">
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-ink-900/85 hover:text-tarum"
            >
              {repo.name}
            </a>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-900/65">
              {repo.applications.join(', ')}
            </p>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <nav aria-label="Atlas pagination" className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="font-mono text-xs uppercase tracking-widest text-ink-900/60 disabled:opacity-30"
          >
            Previous
          </button>
          <span className="font-mono text-xs text-ink-900/65">
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="font-mono text-xs uppercase tracking-widest text-ink-900/60 disabled:opacity-30"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
