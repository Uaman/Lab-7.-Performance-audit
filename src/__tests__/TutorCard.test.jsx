
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TutorCard from '../components/TutorCard';

const tutor = {
  id: 1,
  name: 'Анна Купрікова',
  photo: '/images/tutor.jpg',
  city: 'Київ',
  format: 'online',
  experienceYears: 5,
  verified: true,
  subjects: ['Математика'],
  reviews: [],
  bio: 'Досвідчена репетиторка з математики.',
  pricePerHour: 400,
};

describe('TutorCard', () => {
  it('використовує оптимізовані атрибути для зображення репетитора', () => {
    render(
      <TutorCard
        tutor={tutor}
        isFavorite={false}
        isSelected={false}
        onSelect={() => { }}
        onToggleFavorite={() => { }}
      />
    );

    const image = screen.getByRole('img', { name: 'Анна Купрікова' });

    expect(image.getAttribute('loading')).toBe('lazy');
    expect(image.getAttribute('decoding')).toBe('async');
    expect(image.getAttribute('width')).toBe('300');
    expect(image.getAttribute('height')).toBe('300');
  });
});