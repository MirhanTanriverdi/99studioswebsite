import { useState } from 'react';

// Touch devices (phones/tablets) and users who ask for reduced motion get the
// static layout: no scroll-linked parallax. On phones each parallax layer is a
// large image that has to be re-composited on every scroll frame, which is
// what made scrolling stutter. Desktop keeps the full effect.
const QUERY = '(pointer: coarse), (prefers-reduced-motion: reduce)';

export function useLiteMotion(): boolean {
  const [lite] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(QUERY).matches,
  );
  return lite;
}
