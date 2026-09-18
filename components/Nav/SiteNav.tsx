'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import { person } from '@/lib/content';
import { motionTokens, springs } from '@/lib/motion-tokens';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#atlas', label: 'Atlas' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteNav() {
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink-900/85 backdrop-blur"
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="font-display text-lg tracking-tight text-paper">
          {person.name.split(' ')[0]} {person.name.split(' ')[1]}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href} className="relative py-1">
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={clsx(
                    'relative font-mono text-xs uppercase tracking-widest transition-colors',
                    active === link.href ? 'text-kunyit' : 'text-paper/60 hover:text-paper',
                  )}
                >
                  {link.label}
                </a>
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-kunyit"
                    transition={springs.gentle}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: motionTokens.duration.fast }}
                className="block"
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: motionTokens.duration.fast }}
                className="block"
              >
                <List size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-nav"
            id="mobile-nav"
            aria-label="Primary mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
            className="overflow-hidden border-b border-paper/10 bg-ink-900 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -motionTokens.distance.sm }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springs.gentle, delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-mono text-sm uppercase tracking-widest text-paper/80"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
