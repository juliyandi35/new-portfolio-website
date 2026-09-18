'use client';

import { person } from '@/lib/content';
import { EnvelopeSimple, Phone, LinkedinLogo, GithubLogo } from '@phosphor-icons/react';
import RevealOnScroll from '@/components/Motifs/RevealOnScroll';

const CHANNELS = [
  { label: 'Email', value: person.email, href: `mailto:${person.email}`, Icon: EnvelopeSimple },
  { label: 'Phone', value: person.phone, href: `tel:${person.phone.replace(/[^+\d]/g, '')}`, Icon: Phone },
  { label: 'LinkedIn', value: 'juli-yandi-rahman', href: person.linkedin, Icon: LinkedinLogo },
  { label: 'GitHub', value: 'juliyandi35', href: person.github, Icon: GithubLogo },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink-900 py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-kunyit">Contact</p>
          <h2 id="contact-heading" className="font-display mt-4 max-w-2xl text-3xl sm:text-4xl">
            Open to research, data-systems, and applied-AI conversations.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CHANNELS.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 border-b border-paper/15 pb-4 transition-colors hover:border-paper/40"
                >
                  <Icon size={22} className="text-paper/50" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-paper/65">{label}</span>
                    <span className="block text-base text-paper/90 group-hover:text-paper">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
