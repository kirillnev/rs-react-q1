import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <main className="not-found" aria-label="Страница не найдена">
      <h1>404 - Страница не найдена</h1>
      <Link to="/">Перейти на главную</Link>
    </main>
  );
};

export default NotFound;
