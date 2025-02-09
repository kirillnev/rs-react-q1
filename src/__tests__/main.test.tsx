import { describe, it, expect, vi } from 'vitest';
import { createRoot } from 'react-dom/client';
import '../index.css';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('Main Entry Point', () => {
  it('initializes application correctly', async () => {
    // Создаем фейковый корневой элемент
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Импортируем и выполняем инициализацию приложения
    await import('../main');

    // Проверяем, что createRoot был вызван с правильным элементом
    expect(createRoot).toHaveBeenCalledWith(root);

    // Очищаем DOM после теста
    document.body.removeChild(root);
  });
});
