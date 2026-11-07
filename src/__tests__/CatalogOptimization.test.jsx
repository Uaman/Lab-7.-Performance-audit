import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as catalog from '../utils/catalog';
import App from '../App';

describe('Оптимізація обчислень каталогу (Regression Test)', () => {
  it('не перераховує getVisibleTutors повторно при зміні списку обраних (мемоізація)', () => {
    const getVisibleTutorsSpy = vi.spyOn(catalog, 'getVisibleTutors');

    const { container } = render(<App />);

    expect(getVisibleTutorsSpy).toHaveBeenCalledTimes(1);

    const favButton = container.querySelector('.tutor-card__fav');
    expect(favButton).not.toBeNull();

    fireEvent.click(favButton);

    expect(getVisibleTutorsSpy).toHaveBeenCalledTimes(1);
  });
});
