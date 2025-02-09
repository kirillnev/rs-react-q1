import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import DetailPanel from './components/DetailPanel';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={null} />
        <Route path=":id" element={<DetailPanel />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
