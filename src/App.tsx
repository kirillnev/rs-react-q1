import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import Detail from './components/Detail/Detail.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={null} />
        <Route path=":id" element={<Detail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
