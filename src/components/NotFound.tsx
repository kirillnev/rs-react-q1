import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Страница не найдена</h1>
      <Link to="/">Перейти на главную</Link>
    </div>
  );
};

export default NotFound;
