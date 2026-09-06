import React, { useEffect, useState } from 'react';
import Aside from "./components/Aside";
import MainContent from './components/MainContent';

const bootSequence = [
  { text: <><span className="prompt">$</span> <span className="command">loading portfolio...</span></>, delay: 0 },
  { text: <><span className="success">[✓]</span> <span className="command">modules loaded</span></>, delay: 200 },
  { text: <><span className="success">[✓]</span> <span className="command">fetching profile data</span></>, delay: 400 },
  { text: <><span className="success">[✓]</span> <span className="command">compiling components</span></>, delay: 600 },
  { text: <><span className="warning">[→]</span> <span className="command">initializing arjun_tripathi.dev</span></>, delay: 800 },
];

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [loading, setLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Animate boot sequence lines
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    // End loading after all lines shown
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (loading) {
    return (
      <div id="preloader">
        <div className="boot-text">
          {bootSequence.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              className="boot-line"
              style={{ animationDelay: `${line.delay}ms` }}
            >
              {line.text}
            </div>
          ))}
          <span className="boot-cursor"></span>
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
            checked={theme === 'dark'}
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