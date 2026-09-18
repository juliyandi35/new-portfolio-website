import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0f1a',
          900: '#0b0f1a',
          800: '#121a2b',
          700: '#1a2540',
        },
        paper: {
          DEFAULT: '#f6f1e7',
          soft: '#efe8d8',
        },
        tarum: {
          DEFAULT: '#2f3a7a',
          light: '#4a5aa8',
          dark: '#1c2452',
        },
        soga: '#8a5a34',
        kesumba: '#a8283c',
        kunyit: '#c98a2c',
        signal: '#3fae83',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
