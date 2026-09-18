import { person } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-paper py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center font-mono text-xs text-ink-900/65 sm:flex-row sm:justify-between sm:text-left">
        <p>
          &copy; {new Date().getFullYear()} {person.name}
        </p>
        <p>Built with Next.js and React Three Fiber</p>
      </div>
    </footer>
  );
}
