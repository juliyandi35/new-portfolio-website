import { experience, education } from '@/lib/content';
import RevealOnScroll from '@/components/Motifs/RevealOnScroll';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-tarum">Experience</p>
          <h2 id="experience-heading" className="font-display mt-4 max-w-2xl text-3xl text-ink-900 sm:text-4xl">
            From client research to national data infrastructure.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <ol className="mt-16 space-y-10 border-l border-ink-900/15 pl-8">
            {experience.map((entry) => (
              <li key={entry.role} className="relative">
                <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-tarum" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-widest text-ink-900/65">{entry.period}</p>
                <h3 className="font-display mt-1 text-xl text-ink-900">{entry.role}</h3>
                <p className="text-sm text-ink-900/60">{entry.org}</p>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-900/75">{entry.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {entry.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-ink-900/70">
                      &middot; {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h3 className="mt-20 font-mono text-xs uppercase tracking-widest text-ink-900/65">Education</h3>
          <ol className="mt-6 space-y-6 border-l border-ink-900/15 pl-8">
            {education.map((entry) => (
              <li key={entry.program} className="relative">
                <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-kunyit" aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-widest text-ink-900/65">{entry.period}</p>
                <h4 className="font-display mt-1 text-lg text-ink-900">{entry.program}</h4>
                <p className="text-sm text-ink-900/60">
                  {entry.org} &middot; {entry.detail}
                </p>
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      </div>
    </section>
  );
}
