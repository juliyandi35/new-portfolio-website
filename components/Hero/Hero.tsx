'use client';

import dynamic from 'next/dynamic';
import { ArrowDown } from '@phosphor-icons/react';
import { person } from '@/lib/content';
import { useReducedMotion } from '@/lib/useReducedMotion';
import manifest from '@/data/manifest.json';

const ObservatoryScene = dynamic(() => import('./ObservatoryScene'), { ssr: false });

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const applications = manifest.applications.map((name) => ({
    name,
    count: manifest.repos.filter((r) => r.applications.includes(name)).length,
  }));

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink-900 text-paper"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <ObservatoryScene reducedMotion={reducedMotion} applications={applications} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 pointer-events-none">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/60">
          Nusantara Data Observatory
        </p>
        <h1 className="font-display mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">
          {person.name}, {person.credential}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-paper/80 sm:text-xl">{person.tagline}</p>
        <p className="mt-6 max-w-xl text-base text-paper/60">{person.summary}</p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#work"
            className="pointer-events-auto rounded-full bg-paper px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink-900 transition-transform hover:scale-[1.03]"
          >
            Explore the work
          </a>
          <a href="#contact" className="pointer-events-auto font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-paper">
            Contact
          </a>
        </div>

        <p className="mt-14 font-mono text-xs text-paper/65">
          {manifest.totalRepos} public repositories &middot; {manifest.methodFamilies.length} method families &middot;{' '}
          {manifest.applications.length} applications
        </p>
        <p className="mt-2 font-mono text-[11px] text-paper/40">Hover the orbiting nodes to see each tool&apos;s share.</p>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-paper/50 hover:text-paper"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
