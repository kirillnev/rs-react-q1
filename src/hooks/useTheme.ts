import { useContext } from 'react';
import { ThemeContextType } from '../types';
import ThemeContext from '../context/ThemeContext';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
