import { skillGroups, certifications, languages } from '@/lib/content';
import RevealOnScroll from '@/components/Motifs/RevealOnScroll';

const TRACK_LABEL: Record<string, string> = {
  security: 'Security',
  network: 'Network',
  data: 'Data & AI',
  language: 'Language',
};

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="bg-ink-900 py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-kunyit">Expertise</p>
          <h2 id="expertise-heading" className="font-display mt-4 max-w-2xl text-3xl sm:text-4xl">
            Statistical depth, applied AI, and the security fundamentals underneath.
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <RevealOnScroll key={group.label} delay={i * 0.05}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-paper/65">{group.label}</h3>
              <ul className="mt-3 space-y-2 border-t border-paper/10 pt-3">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-paper/85">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.1}>
          <h3 className="mt-16 font-mono text-xs uppercase tracking-widest text-paper/65">Certifications, 2024 to 2026</h3>
          <div className="mt-4 divide-y divide-paper/10 border-t border-paper/10">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm">
                <span className="text-paper/90">{cert.name}</span>
                <span className="font-mono text-xs text-paper/65">
                  {TRACK_LABEL[cert.track]} &middot; {cert.org} &middot; {cert.year}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h3 className="mt-16 font-mono text-xs uppercase tracking-widest text-paper/65">Languages</h3>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-paper/10 pt-4 text-sm text-paper/80">
            {languages.map((lang) => (
              <span key={lang.name}>
                {lang.name} <span className="text-paper/65">— {lang.level}</span>
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
