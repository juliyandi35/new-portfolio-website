function parangBands(count: number, width: number, height: number) {
  const bands = [];
  const step = width / count;
  for (let i = 0; i < count; i += 1) {
    const x = i * step;
    bands.push(`M ${x} ${height} L ${x + height} 0`);
  }
  return bands.join(' ');
}

/**
 * A tonal, aria-hidden section-edge texture inspired by "parang" (diagonal
 * broken-blade) batik geometry: repeating diagonal bands, computed rather
 * than shipped as an image asset.
 */
export default function ParangDivider({ className = '' }: { className?: string }) {
  const width = 480;
  const height = 24;
  const path = parangBands(24, width, height);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-6 w-full text-ink-900/10 ${className}`}
    >
      <path d={path} stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
