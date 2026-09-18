import Image from 'next/image';
import { person } from '@/lib/content';
import RevealOnScroll from '@/components/Motifs/RevealOnScroll';
import ParangDivider from '@/components/Motifs/ParangDivider';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <RevealOnScroll>
            <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full border border-ink-900/10 shadow-sm md:w-full md:max-w-xs">
              <Image
                src="/images/portrait.jpg"
                alt={`Portrait of ${person.name}`}
                fill
                sizes="(min-width: 768px) 20rem, 14rem"
                className="object-cover"
                priority={false}
              />
            </div>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-7">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-tarum">About</p>
            <h2 id="about-heading" className="font-display mt-4 text-3xl text-ink-900 sm:text-4xl">
              A statistician&apos;s training, applied to systems that have to keep running.
            </h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-900/75">{person.summary}</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-900/75">
              {person.origin}, now based in {person.location}. Day to day work sits at the join of statistical
              modeling, applied machine learning, and the network and security fundamentals that keep a data
              system trustworthy end to end.
            </p>
          </RevealOnScroll>
        </div>
      </div>
      <ParangDivider className="mt-20" />
    </section>
  );
}
