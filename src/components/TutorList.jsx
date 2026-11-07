import { useRef, useState, useEffect } from 'react';
import TutorCard from './TutorCard';
import { useBioClamp } from '../hooks/useBioClamp';

const PAGE_SIZE = 18;

export default function TutorList({
  tutors,
  favorites,
  selectedId,
  onSelect,
  onToggleFavorite,
  style,
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleTutors = tutors.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [tutors]);

  const containerRef = useRef(null);
  useBioClamp(containerRef, [visibleTutors]);

  const hasMore = visibleCount < tutors.length;

  return (
    <>
      <div className="tutor-grid" ref={containerRef} style={style}>
        {visibleTutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            tutor={tutor}
            isFavorite={favorites.includes(tutor.id)}
            isSelected={tutor.id === selectedId}
            onSelect={() => onSelect(tutor.id)}
            onToggleFavorite={() => onToggleFavorite(tutor.id)}
          />
        ))}
      </div>
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <button
            type="button"
            className="button button--ghost"
            style={{ padding: '10px 24px', fontSize: '15px' }}
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Показати ще ({tutors.length - visibleCount} залишилось)
          </button>
        </div>
      )}
    </>
  );
}
