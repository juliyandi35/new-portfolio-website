'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { motionTokens, springs } from '@/lib/motion-tokens';
import { useSafeMotion } from '@/lib/useSafeMotion';

export default function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const safe = useSafeMotion(motionTokens.distance.lg);

  return (
    <motion.div
      initial={safe.initial}
      whileInView={safe.animate}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ ...springs.gentle, delay }}
    >
      {children}
    </motion.div>
  );
}
