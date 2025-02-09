import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="spinner" data-testid="spinner-container">
      <div className="spinner-inner" data-testid="spinner-inner"></div>
    </div>
  );
};

export default Spinner;
