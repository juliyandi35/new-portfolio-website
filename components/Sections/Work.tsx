'use client';

import { motion } from 'motion/react';
import { flagshipProjects } from '@/lib/content';
import RevealOnScroll from '@/components/Motifs/RevealOnScroll';
import { springs } from '@/lib/motion-tokens';
import { ArrowUpRight } from '@phosphor-icons/react';

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-tarum">Selected work</p>
          <h2 id="work-heading" className="font-display mt-4 max-w-2xl text-3xl text-ink-900 sm:text-4xl">
            Five projects, five different problems.
          </h2>
          <p className="mt-4 max-w-prose text-base text-ink-900/70">
            Curated from the full repository catalog below for variety of method, not just variety of tool.
          </p>
        </RevealOnScroll>

        <div className="mt-16 space-y-px bg-ink-900/10">
          {flagshipProjects.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={i * 0.04}>
              <motion.a
                href={`https://github.com/juliyandi35/${project.slug}`}
                target="_blank"
                rel="noreferrer"
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="grid grid-cols-1 gap-4 bg-paper px-2 py-8 transition-colors hover:bg-ink-900/[0.03] md:grid-cols-12 md:items-start md:gap-8"
              >
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl text-ink-900 md:text-2xl">{project.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-900/65">
                    {project.methodFamilies.join(' + ')} &middot; {project.application}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm leading-relaxed text-ink-900/70">
                    <span className="text-ink-900/65">Problem — </span>
                    {project.problem}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/70">
                    <span className="text-ink-900/65">Method — </span>
                    {project.method}
                  </p>
                </div>
                <motion.div
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={springs.snappy}
                  className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-tarum md:col-span-1 md:justify-end"
                >
                  <motion.span
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.15 }}
                  >
                    View
                  </motion.span>
                  <ArrowUpRight size={16} />
                </motion.div>
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
