import React, { useEffect, useState, useCallback, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import './Navigation.css';

/**
 * Componente de navegación mejorado con optimizaciones de rendimiento,
 * accesibilidad completa y efectos visuales avanzados.
 */
const Navigation = memo(({ 
  currentPage = 0, 
  totalPages = 1, 
  onNext, 
  onPrev, 
  onRandomSpell,
  onAddSpell,
  onToggleTheme,
  onToggleSound,
  soundEnabled = true,
  theme = 'dusk',
  isLoading = false,
  isMobile = false
}) => {
  // Estados
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [keyPressTime, setKeyPressTime] = useState(0);
  
  // Refs para optimización
  const progressRef = useRef(0);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);

  // Calcular progreso con animación fluida usando requestAnimationFrame
  useEffect(() => {
    const targetProgress = totalPages > 0 
      ? ((currentPage + 1) / totalPages) * 100 
      : 0;
    
    const animateProgress = () => {
      const current = progressRef.current;
      const diff = targetProgress - current;
      
      if (Math.abs(diff) < 0.1) {
        progressRef.current = targetProgress;
        setProgress(targetProgress);
        return;
      }
      
      // Animación suave con easing
      progressRef.current = current + diff * 0.1;
      setProgress(progressRef.current);
      
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    };
    
    animationFrameRef.current = requestAnimationFrame(animateProgress);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentPage, totalPages]);

  // Sistema de sonido optimizado con Web Audio API
  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current && soundEnabled) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, [soundEnabled]);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    const audioContext = createAudioContext();
    if (!audioContext) return;
    
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const now = audioContext.currentTime;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configurar sonidos según tipo
      const soundConfig = {
        'nav': { freq: 523.25, duration: 0.15, type: 'sine' },
        'page': { freq: 392.00, duration: 0.2, type: 'sine' },
        'magic': { freq: 659.25, duration: 0.4, type: 'triangle' },
        'button': { freq: 440.00, duration: 0.1, type: 'square' }
      };
      
      const config = soundConfig[type] || soundConfig.nav;
      
      oscillator.frequency.setValueAtTime(config.freq, now);
      oscillator.type = config.type;
      
      // Envelope ADSR mejorado
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + config.duration);
      
      oscillator.start(now);
      oscillator.stop(now + config.duration);
      
      // Limpieza automática
      setTimeout(() => {
        oscillator.disconnect();
        gainNode.disconnect();
      }, config.duration * 1000 + 100);
    } catch (error) {
      console.warn('Error al reproducir sonido:', error);
    }
  }, [soundEnabled, createAudioContext]);

  // Manejar atajos de teclado con debounce
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevenir múltiples activaciones rápidas
      const now = Date.now();
      if (now - keyPressTime < 300 || isLoading) return;
      
      // Ignorar si el foco está en un input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      let handled = false;
      
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          if (currentPage > 0) {
            e.preventDefault();
            onPrev?.();
            playSound('page');
            handled = true;
          }
          break;
          
        case 'arrowright':
        case 'd':
          if (currentPage < totalPages - 1) {
            e.preventDefault();
            onNext?.();
            playSound('page');
            handled = true;
          }
          break;
          
        case 'r':
          if (onRandomSpell) {
            e.preventDefault();
            setKeyPressTime(now);
            onRandomSpell();
            playSound('magic');
            handled = true;
          }
          break;
          
        case 'n':
        case 'a':
          if (onAddSpell) {
            e.preventDefault();
            onAddSpell();
            playSound('button');
            handled = true;
          }
          break;
          
        case 's':
          if (onToggleSound) {
            e.preventDefault();
            onToggleSound();
            playSound('button');
            handled = true;
          }
          break;
          
        case 't':
          if (onToggleTheme) {
            e.preventDefault();
            onToggleTheme();
            playSound('nav');
            handled = true;
          }
          break;
          
        case 'b':
        case 'm':
          // Atajo para bookmark (se puede implementar si hay función)
          playSound('button');
          break;
          
        case 'escape':
          // Volver al inicio si estamos en una página
          if (currentPage > 0) {
            e.preventDefault();
            onPrev?.();
            playSound('nav');
          }
          break;
      }
      
      if (handled) {
        setKeyPressTime(now);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    currentPage, totalPages, onPrev, onNext, onRandomSpell, 
    onAddSpell, onToggleSound, onToggleTheme, keyPressTime, 
    isLoading, playSound
  ]);

  // Limpiar audio context al desmontar
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handlers optimizados
  const handlePrevClick = useCallback(() => {
    if (currentPage === 0 || isLoading) return;
    playSound('page');
    onPrev?.();
  }, [currentPage, isLoading, onPrev, playSound]);

  const handleNextClick = useCallback(() => {
    if (currentPage === totalPages - 1 || isLoading) return;
    playSound('page');
    onNext?.();
  }, [currentPage, totalPages, isLoading, onNext, playSound]);

  const handleRandomClick = useCallback(() => {
    if (isLoading || !onRandomSpell) return;
    playSound('magic');
    onRandomSpell();
  }, [isLoading, onRandomSpell, playSound]);

  const handleAddClick = useCallback(() => {
    if (isLoading || !onAddSpell) return;
    playSound('button');
    onAddSpell();
  }, [isLoading, onAddSpell, playSound]);

  const handleSoundToggle = useCallback(() => {
    playSound('button');
    onToggleSound?.();
  }, [onToggleSound, playSound]);

  const handleThemeToggle = useCallback(() => {
    playSound('nav');
    onToggleTheme?.();
  }, [onToggleTheme, playSound]);

  // Renderizar controles para móvil
  if (isMobile) {
    return (
      <nav 
        className="navigation-container mobile"
        aria-label="Navegación principal"
        data-theme={theme}
        data-loading={isLoading}
      >
        {/* Controles principales */}
        <div className="nav-main-controls">
          <div className="page-controls-mobile">
            <button
              onClick={handlePrevClick}
              disabled={currentPage === 0 || isLoading}
              className="nav-button prev-button"
              aria-label="Página anterior"
              aria-disabled={currentPage === 0}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
            >
              <span className="button-icon" aria-hidden="true">‹</span>
            </button>
            
            <div className="page-indicator-mobile">
              <div className="page-number" aria-live="polite">
                <span className="current-page">{currentPage + 1}</span>
                <span className="page-separator" aria-hidden="true">/</span>
                <span className="total-pages">{totalPages}</span>
              </div>
            </div>
            
            <button
              onClick={handleNextClick}
              disabled={currentPage === totalPages - 1 || isLoading}
              className="nav-button next-button"
              aria-label="Página siguiente"
              aria-disabled={currentPage === totalPages - 1}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
            >
              <span className="button-icon" aria-hidden="true">›</span>
            </button>
          </div>
        </div>
        
        {/* Barra de progreso móvil */}
        <div className="progress-container">
          <div 
            className="progress-bar" 
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
              data-progress={Math.round(progress)}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
          <div className="progress-text">
            <span className="progress-percent">{Math.round(progress)}%</span>
            <span className="sr-only">completado</span>
          </div>
        </div>
        
        {/* Controles secundarios móvil */}
        <div className="nav-secondary-controls-mobile">
          <button
            onClick={handleRandomClick}
            className="nav-button random-button"
            aria-label="Hechizo aleatorio de consuelo"
            disabled={isLoading}
          >
            <span className="button-icon" aria-hidden="true">✨</span>
          </button>
          
          <button
            onClick={handleAddClick}
            className="nav-button add-button"
            aria-label="Agregar nuevo hechizo"
            disabled={isLoading}
          >
            <span className="button-icon" aria-hidden="true">+</span>
          </button>
          
          <button
            onClick={handleSoundToggle}
            className={`config-button sound-button ${soundEnabled ? 'enabled' : 'disabled'}`}
            aria-label={soundEnabled ? "Desactivar sonido" : "Activar sonido"}
          >
            <span className="config-icon" aria-hidden="true">
              {soundEnabled ? '🔊' : '🔇'}
            </span>
          </button>
          
          <button
            onClick={handleThemeToggle}
            className="config-button theme-button"
            aria-label={`Cambiar a tema ${theme === 'dusk' ? 'nocturno' : 'crepuscular'}`}
          >
            <span className="config-icon" aria-hidden="true">
              {theme === 'dusk' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      </nav>
    );
  }

  // Renderización para desktop
  return (
    <nav 
      className="navigation-container"
      aria-label="Navegación principal"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-theme={theme}
      data-loading={isLoading}
      data-hovering={isHovering}
    >
      {/* Controles principales */}
      <div className="nav-main-controls">
        <div className="page-controls">
          {/* Botón Anterior */}
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 0 || isLoading}
            className={`nav-button prev-button ${currentPage === 0 || isLoading ? 'disabled' : ''}`}
            aria-label="Página anterior"
            aria-disabled={currentPage === 0}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            data-pressed={isPressed}
          >
            <span className="button-icon" aria-hidden="true">‹</span>
            <span className="button-text">
              {isLoading ? 'Cargando...' : 'Anterior'}
            </span>
          </button>
          
          {/* Indicador de página centrado */}
          <div className="page-indicator">
            <div className="page-number-display" aria-live="polite">
              <span className="current-page">
                {isLoading ? '...' : currentPage + 1}
              </span>
              <span className="page-separator" aria-hidden="true">/</span>
              <span className="total-pages">{totalPages}</span>
            </div>
            <div className="page-label" aria-hidden="true">
              PÁGINA
            </div>
          </div>
          
          {/* Botón Siguiente */}
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages - 1 || isLoading}
            className={`nav-button next-button ${currentPage === totalPages - 1 || isLoading ? 'disabled' : ''}`}
            aria-label="Página siguiente"
            aria-disabled={currentPage === totalPages - 1}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            data-pressed={isPressed}
          >
            <span className="button-text">
              {isLoading ? 'Cargando...' : 'Siguiente'}
            </span>
            <span className="button-icon" aria-hidden="true">›</span>
          </button>
        </div>
        
        {/* Barra de progreso */}
        <div className="progress-container">
          <div 
            className="progress-bar" 
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Progreso de lectura: ${Math.round(progress)}%`}
          >
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
              data-progress={Math.round(progress)}
            >
              <div className="progress-glow"></div>
              <div className="progress-sparkle"></div>
            </div>
          </div>
          <div className="progress-text">
            <span className="progress-percent">{Math.round(progress)}%</span>
            <span className="progress-label">completado</span>
            {isHovering && (
              <span className="progress-hint">
                {currentPage + 1} de {totalPages} páginas
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Controles secundarios */}
      <div className="nav-secondary-controls">
        <button
          onClick={handleRandomClick}
          className="nav-button random-button"
          aria-label="Abrir un hechizo aleatorio para consuelo"
          title="Presiona R para hechizo aleatorio"
          disabled={isLoading}
          data-tooltip="Hechizo aleatorio (R)"
        >
          <span className="button-icon" aria-hidden="true">✨</span>
          <span className="button-text">Consuelo aleatorio</span>
          <span className="button-badge" aria-hidden="true">Nuevo</span>
        </button>
        
        <button
          onClick={handleAddClick}
          className="nav-button add-button"
          aria-label="Agregar nuevo hechizo"
          title="Presiona N para agregar hechizo"
          disabled={isLoading}
          data-tooltip="Agregar hechizo (N)"
        >
          <span className="button-icon" aria-hidden="true">+</span>
          <span className="button-text">Escribir hechizo</span>
        </button>
        
        <div className="config-controls">
          <button
            onClick={handleSoundToggle}
            className={`config-button sound-button ${soundEnabled ? 'enabled' : 'disabled'}`}
            aria-label={soundEnabled ? "Sonido activado. Click para desactivar" : "Sonido desactivado. Click para activar"}
            title={`Sonido ${soundEnabled ? 'activado' : 'desactivado'} (Presiona S)`}
            data-tooltip={`Sonido ${soundEnabled ? 'ON' : 'OFF'} (S)`}
          >
            <span className="config-icon" aria-hidden="true">
              {soundEnabled ? '🔊' : '🔇'}
            </span>
            <span className="sr-only">
              {soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
            </span>
          </button>
          
          <button
            onClick={handleThemeToggle}
            className="config-button theme-button"
            aria-label={`Cambiar a tema ${theme === 'dusk' ? 'nocturno' : 'crepuscular'}`}
            title={`Tema actual: ${theme === 'dusk' ? 'crepuscular' : 'nocturno'} (Presiona T)`}
            data-tooltip={`Tema: ${theme === 'dusk' ? 'Crepuscular' : 'Nocturno'} (T)`}
          >
            <span className="config-icon" aria-hidden="true">
              {theme === 'dusk' ? '🌙' : '☀️'}
            </span>
            <span className="sr-only">
              Cambiar a tema {theme === 'dusk' ? 'nocturno' : 'crepuscular'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Indicadores de navegación */}
      <div className="nav-hints" role="complementary" aria-label="Atajos de teclado">
        <div className="hint-item">
          <kbd className="hint-key">← →</kbd>
          <span className="hint-text">Navegar páginas</span>
        </div>
        <div className="hint-item">
          <kbd className="hint-key">R</kbd>
          <span className="hint-text">Hechizo aleatorio</span>
        </div>
        <div className="hint-item">
          <kbd className="hint-key">N</kbd>
          <span className="hint-text">Agregar hechizo</span>
        </div>
        <div className="hint-item">
          <kbd className="hint-key">T</kbd>
          <span className="hint-text">Cambiar tema</span>
        </div>
      </div>
      
      {/* Símbolos decorativos */}
      <div className="nav-decoration" aria-hidden="true">
        <div className="decoration-line left"></div>
        <div className="decoration-symbols">
          <span role="img" aria-label="estrella mágica">✦</span>
          <span role="img" aria-label="rombo encantado">✧</span>
          <span role="img" aria-label="flor mística">❁</span>
        </div>
        <div className="decoration-line right"></div>
      </div>
      
      {/* Tooltips para hover */}
      <div className="nav-tooltips" aria-hidden="true">
        <div className="tooltip" data-for="random-button">Presiona R</div>
        <div className="tooltip" data-for="add-button">Presiona N</div>
        <div className="tooltip" data-for="sound-button">Presiona S</div>
        <div className="tooltip" data-for="theme-button">Presiona T</div>
      </div>
    </nav>
  );
});

// Prop Types mejorados con validación completa
Navigation.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onRandomSpell: PropTypes.func,
  onAddSpell: PropTypes.func,
  onToggleTheme: PropTypes.func,
  onToggleSound: PropTypes.func,
  soundEnabled: PropTypes.bool,
  theme: PropTypes.oneOf(['dusk', 'night']),
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool
};

// Componente de comparación personalizado para memo
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.currentPage === nextProps.currentPage &&
    prevProps.totalPages === nextProps.totalPages &&
    prevProps.soundEnabled === nextProps.soundEnabled &&
    prevProps.theme === nextProps.theme &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.isMobile === nextProps.isMobile
  );
};

Navigation.displayName = 'Navigation';

export default React.memo(Navigation, areEqual);