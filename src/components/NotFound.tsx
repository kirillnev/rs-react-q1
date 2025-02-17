import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <main className="not-found">
      <h1>404 - Page not found</h1>
      <Link to="/">Go to the main page</Link>
    </main>
  );
};

export default NotFound;
