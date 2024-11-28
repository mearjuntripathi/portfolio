import React, { useEffect, useState } from 'react';
import Aside from "./components/Aside";
import MainContent from './components/MainContent';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    } else {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Update theme based on system preference
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Listen for changes to the system theme
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      // Cleanup listener on unmount
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="preloader">
        <div className="jumper">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
      <div className="slider-container">
        <input
          type="checkbox"
          id="slider"
          className="slider-input"
          onChange={toggleTheme}
          checked={theme === 'dark'} // Reflect state
        />
        <label htmlFor="slider" className="slider-label"></label>
      </div>
        <Aside />
        <MainContent />
      </main>
    </>
  );
}

export default App;