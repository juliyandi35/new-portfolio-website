'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';
import { ArrowDown } from '@phosphor-icons/react';
import { person } from '@/lib/content';
import { motionTokens, springs } from '@/lib/motion-tokens';
import manifest from '@/data/manifest.json';

const ObservatoryScene = dynamic(() => import('./ObservatoryScene'), { ssr: false });

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

function itemVariants(reduce: boolean) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : motionTokens.distance.lg },
    visible: { opacity: 1, y: 0, transition: springs.gentle },
  };
}

function ScrollCue({ reduceMotion }: { reduceMotion: boolean }) {
  const controls = useAnimation();

  useEffect(() => {
    if (reduceMotion) return;
    const bob = () =>
      controls.start({
        y: [0, 6, 0],
        transition: { repeat: Infinity, duration: 1.8, ease: motionTokens.easing.smooth },
      });
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') controls.stop();
      else void bob();
    };
    void bob();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      controls.stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [controls, reduceMotion]);

  return (
    <motion.a
      href="#about"
      aria-label="Scroll to About section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: motionTokens.duration.slow }}
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-paper/50 hover:text-paper"
    >
      <motion.span animate={controls} className="block">
        <ArrowDown size={20} />
      </motion.span>
    </motion.a>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  const applications = manifest.applications.map((name) => ({
    name,
    count: manifest.repos.filter((r) => r.applications.includes(name)).length,
  }));

  const item = itemVariants(reduceMotion);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink-900 text-paper"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <ObservatoryScene reducedMotion={reduceMotion} applications={applications} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40"
      >
        <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.3em] text-paper/60">
          Nusantara Data Observatory
        </motion.p>
        <motion.h1 variants={item} className="font-display mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">
          {person.name}, {person.credential}
        </motion.h1>
        <motion.p variants={item} className="mt-4 max-w-2xl text-lg text-paper/80 sm:text-xl">
          {person.tagline}
        </motion.p>
        <motion.p variants={item} className="mt-6 max-w-xl text-base text-paper/60">
          {person.summary}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-6">
          <motion.a
            href="#work"
            whileHover={{ scale: motionTokens.scale.pop }}
            whileTap={{ scale: motionTokens.scale.press }}
            transition={springs.snappy}
            className="pointer-events-auto rounded-full bg-paper px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink-900"
          >
            Explore the work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: motionTokens.scale.pop }}
            whileTap={{ scale: motionTokens.scale.press }}
            transition={springs.snappy}
            className="pointer-events-auto font-mono text-xs uppercase tracking-widest text-paper/70"
          >
            Contact
          </motion.a>
        </motion.div>

        <motion.p variants={item} className="mt-14 font-mono text-xs text-paper/65">
          {manifest.totalRepos} public repositories &middot; {manifest.methodFamilies.length} method families &middot;{' '}
          {manifest.applications.length} applications
        </motion.p>
        <motion.p variants={item} className="mt-2 font-mono text-[11px] text-paper/40">
          Hover the orbiting nodes to see each tool&apos;s share.
        </motion.p>
      </motion.div>

      <ScrollCue reduceMotion={reduceMotion} />
    </section>
  );
}
