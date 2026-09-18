import type { Manifest } from './manifestParser';

/**
 * A 13-tone palette drawn from dyes and pigments long used in Nusantara
 * textile and craft tradition, plus enough neighboring hues to cover every
 * method family in the catalog without repeating a color. Assigned by real
 * usage count, most-practiced family first, so the strongest color always
 * marks the deepest expertise rather than an arbitrary category order.
 */
const DYE_PALETTE = [
  '#2f3a7a', // tarum — indigo
  '#a8283c', // kesumba — noni/morinda red
  '#c98a2c', // kunyit — turmeric ochre
  '#8a5a34', // soga — bark brown
  '#3fae83', // daun — leaf green
  '#5b6ee8', // biru laut — sea blue
  '#c9542c', // bata — terracotta
  '#7a4a9c', // ungu pinang — areca purple
  '#2c8a8a', // pandan teal
  '#d4a373', // pasir — sand
  '#4a4a6a', // malam — wax-resist slate
  '#e0b03f', // emas padi — rice gold
  '#6b8e4e', // sawah — paddy moss
];

export function buildMethodPalette(manifest: Manifest): Map<string, string> {
  const counts = manifest.methodFamilies.map((family) => ({
    family,
    count: manifest.repos.filter((r) => r.methods.includes(family)).length,
  }));
  counts.sort((a, b) => b.count - a.count);

  const palette = new Map<string, string>();
  counts.forEach(({ family }, i) => {
    palette.set(family, DYE_PALETTE[i % DYE_PALETTE.length]);
  });
  return palette;
}
