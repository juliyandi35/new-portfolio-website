'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { List, X } from '@phosphor-icons/react';
import { person } from '@/lib/content';

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
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={clsx(
                    'font-mono text-xs uppercase tracking-widest transition-colors',
                    active === link.href ? 'text-kunyit' : 'text-paper/60 hover:text-paper',
                  )}
                >
                  {link.label}
                </a>
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
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        className={clsx(
          'overflow-hidden border-b border-paper/10 bg-ink-900 transition-[max-height] md:hidden',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-sm uppercase tracking-widest text-paper/80"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
