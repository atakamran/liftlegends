
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  getThemeGradient: () => string;
  getButtonGradient: () => string;
  getCardGradient: () => string;
  getTextColor: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Get theme from localStorage or set default
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Helper functions for gradients and colors based on theme
  const getThemeGradient = () => {
    return theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
      : 'bg-gradient-to-br from-gray-100 via-white to-gray-200';
  };
  
  const getButtonGradient = () => {
    return theme === 'dark'
      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'
      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600';
  };
  
  const getCardGradient = () => {
    return theme === 'dark'
      ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
      : 'bg-gradient-to-br from-white via-gray-50 to-gray-100';
  };

  const getTextColor = () => {
    return theme === 'dark' ? 'text-white' : 'text-gray-800';
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, getThemeGradient, getButtonGradient, getCardGradient, getTextColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
