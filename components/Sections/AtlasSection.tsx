import manifest from '@/data/manifest.json';
import { buildMethodPalette } from '@/lib/methodPalette';
import RevealOnScroll from '@/components/Motifs/RevealOnScroll';
import ProjectAtlas from '@/components/Atlas/ProjectAtlas';

export default function AtlasSection() {
  const palette = buildMethodPalette(manifest);
  const total = manifest.repos.length;
  const counts = manifest.methodFamilies
    .map((family) => ({
      family,
      count: manifest.repos.filter((r) => r.methods.includes(family)).length,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <section id="atlas" aria-labelledby="atlas-heading" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-tarum">Evidence at scale</p>
          <h2 id="atlas-heading" className="font-display mt-4 max-w-2xl text-3xl text-ink-900 sm:text-4xl">
            The full catalog, as additional evidence.
          </h2>
          <p className="mt-4 max-w-prose text-base text-ink-900/70">
            {total} public repositories on github.com/juliyandi35, each carrying its own method and tool taxonomy in
            its GitHub description. Nothing here is hand-curated or scored.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <div
            className="mt-10 flex h-3 w-full overflow-hidden rounded-full"
            role="img"
            aria-label={`Method family distribution across ${total} repositories: ${counts
              .map((c) => `${c.family} ${c.count}`)
              .join(', ')}`}
          >
            {counts.map((c) => (
              <span
                key={c.family}
                style={{ width: `${(c.count / total) * 100}%`, backgroundColor: palette.get(c.family) }}
              />
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {counts.map((c) => (
              <li key={c.family} className="flex items-center gap-2 text-xs text-ink-900/60">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: palette.get(c.family) }}
                  aria-hidden="true"
                />
                {c.family} ({c.count})
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <div className="mt-16">
          <ProjectAtlas />
        </div>
      </div>
    </section>
  );
}
