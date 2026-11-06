import { useLayoutEffect } from 'react';

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const update = () => {
      const bioElements = container.querySelectorAll('.tutor-card__bio');
      const updates = [];

      bioElements.forEach((bio) => {
        const card = bio.closest('.tutor-card');
        if (card) {
          const isOverflowing = bio.scrollHeight > bio.clientHeight + 1;
          updates.push({ card, isOverflowing });
        }
      });

      updates.forEach(({ card, isOverflowing }) => {
        card.classList.toggle('has-more', isOverflowing);
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, deps);
}
