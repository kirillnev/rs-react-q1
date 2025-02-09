import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import DetailPanel from '../DetailPanel';

// Мокаем хук useCharacterDetails с корректной структурой возвращаемых данных
vi.mock('../../hooks/useCharacterDetails', () => ({
  useCharacterDetails: () => ({
    characterData: {
      character: {
        name: 'Test Name',
        gender: 'Test Gender', // если поле обязательно
        // можно добавить другие поля, если компонент их использует
      },
    },
    isLoading: false, // загрузка завершена
    error: null,
  }),
}));

describe('DetailPanel', () => {
  it.skip('рендерится без ошибок и отображает данные после загрузки', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          {/* Определяем маршрут, чтобы useParams корректно передал id */}
          <Route path="/:id" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );

    // Проверяем, что имя персонажа отображается
    const nameElement = screen.getByText('Test Name');
    expect(nameElement).toBeInTheDocument();

    // Проверяем, что пол персонажа также отображается (если компонент его выводит)
    const genderElement = screen.getByText('Gender: Test Gender');
    expect(genderElement).toBeInTheDocument();
  });
});
