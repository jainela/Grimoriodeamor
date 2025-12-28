import React, { useState, useEffect } from 'react';
import './Theme.css';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('celestial');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const themes = [
    { id: 'celestial', name: 'Celestial', icon: '🌌' },
    { id: 'dusk', name: 'Crepuscular', icon: '🌆' },
    { id: 'night', name: 'Nocturno', icon: '🌙' },
    { id: 'forest', name: 'Bosque', icon: '🌳' },
    { id: 'lagoon', name: 'Laguna', icon: '🌊' },
    { id: 'aurora', name: 'Aurora', icon: '✨' },
    { id: 'parchment', name: 'Manuscrito', icon: '📜' }
  ];

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('grimorio-theme');
    if (savedTheme) {
      changeTheme(savedTheme, false);
    }
  }, []);

  const changeTheme = (themeId, animate = true) => {
    if (animate) {
      setIsTransitioning(true);
    }

    // Aplicar tema
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${themeId}`);
    
    setCurrentTheme(themeId);
    localStorage.setItem('grimorio-theme', themeId);

    if (animate) {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleThemeClick = (themeId) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className={`theme-switcher ${isOpen ? 'active' : ''}`}>
      <div className="theme-palette">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`theme-color ${currentTheme === theme.id ? 'active' : ''}`}
            data-theme={theme.id}
            onClick={() => handleThemeClick(theme.id)}
            title={theme.name}
            aria-label={`Cambiar a tema ${theme.name}`}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{theme.name}</span>
          </button>
        ))}
      </div>
      
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar selector de temas" : "Abrir selector de temas"}
        title="Cambiar tema"
      >
        <span className="theme-toggle-icon">
          {isOpen ? '✕' : '🎨'}
        </span>
      </button>
      
      {isTransitioning && (
        <div className="theme-transition-overlay"></div>
      )}
    </div>
  );
};

export default ThemeSwitcher;