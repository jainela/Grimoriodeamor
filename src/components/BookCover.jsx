import React, { useState, useRef, useCallback, memo, useEffect, useMemo } from 'react';
import './BookCover.css';

// Configuración optimizada
const CONFIG = {
  STAR_COUNT: 12,
  PARTICLE_COUNT: 6,
  SPINE_LETTERS: ['G', 'R', 'I', 'M', 'O', 'R', 'I', 'O'],
  CLICK_DELAY: 200,
  PULSE_INTERVAL: 600
};

// Memoizar componentes con React.memo y evitar re-renders
const StarPoint = memo(({ id }) => {
  // Generar posiciones de forma determinística para evitar re-renders
  const position = useMemo(() => {
    const seed = id * 123.456;
    return {
      left: 20 + (Math.sin(seed) * 0.5 + 0.5) * 60,
      top: 20 + (Math.cos(seed * 0.7) * 0.5 + 0.5) * 60
    };
  }, [id]);

  return (
    <div 
      className="star-point"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
      }}
    />
  );
});

StarPoint.displayName = 'StarPoint';

const MagicParticle = memo(({ id, delay }) => {
  const position = useMemo(() => {
    const seed = id * 234.567;
    return {
      left: 15 + (Math.sin(seed) * 0.5 + 0.5) * 70
    };
  }, [id]);

  return (
    <div
      className="magic-particle"
      style={{
        left: `${position.left}%`,
        animationDelay: `${delay}s`
      }}
    />
  );
});

MagicParticle.displayName = 'MagicParticle';

// Componente principal optimizado
const BookCover = memo(({ onOpen }) => {
  const [uiState, setUiState] = useState({
    isHovering: false,
    isClicking: false,
    magicPulse: 0
  });
  
  const stateRef = useRef(uiState);
  stateRef.current = uiState;
  
  // Referencias optimizadas
  const clickTimeoutRef = useRef(null);
  const pulseIntervalRef = useRef(null);
  const containerRef = useRef(null);
  
  // Gestión de estados con batching
  const updateState = useCallback((updates) => {
    setUiState(prev => ({ ...prev, ...updates }));
  }, []);

  // Efectos optimizados
  useEffect(() => {
    const animatePulse = () => {
      pulseIntervalRef.current = requestAnimationFrame(() => {
        setUiState(prev => ({
          ...prev,
          magicPulse: (prev.magicPulse + 1) % 10
        }));
      });
      
      setTimeout(animatePulse, CONFIG.PULSE_INTERVAL);
    };
    
    animatePulse();
    
    return () => {
      if (pulseIntervalRef.current) {
        cancelAnimationFrame(pulseIntervalRef.current);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  // Handlers ultra optimizados
  const handleInteraction = useCallback((() => {
    let lastClickTime = 0;
    const CLICK_DEBOUNCE = 300;
    
    return () => {
      const now = Date.now();
      if (now - lastClickTime < CLICK_DEBOUNCE) return;
      
      lastClickTime = now;
      
      updateState({ isClicking: true });
      
      // Usar requestAnimationFrame para mejor timing
      requestAnimationFrame(() => {
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }
        
        clickTimeoutRef.current = setTimeout(() => {
          onOpen();
          updateState({ isClicking: false });
        }, CONFIG.CLICK_DELAY);
      });
    };
  })(), [onOpen, updateState]);

  const handleMouseEnter = useCallback(() => updateState({ isHovering: true }), [updateState]);
  const handleMouseLeave = useCallback(() => updateState({ isHovering: false }), [updateState]);

  // Generación memoizada de arrays
  const starsArray = useMemo(() => 
    Array.from({ length: CONFIG.STAR_COUNT }, (_, i) => i),
  []);

  const particlesArray = useMemo(() => 
    Array.from({ length: CONFIG.PARTICLE_COUNT }, (_, i) => ({
      id: i,
      delay: i * 0.3
    })),
  []);

  // Render optimizado
  return (
    <div 
      ref={containerRef}
      className={`book-cover-container ${uiState.isHovering ? 'hovering' : ''} ${uiState.isClicking ? 'clicking' : ''}`}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-magic-pulse={uiState.magicPulse}
      role="button"
      tabIndex={0}
      aria-label="Abrir Grimorio de Frieren - Libro de hechizos antiguos"
      onKeyDown={useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }, [handleInteraction])}
    >
      {/* Marco exterior optimizado */}
      <div className="book-frame">
        {['tl', 'tr', 'bl', 'br'].map((corner) => (
          <div 
            key={corner}
            className={`frame-corner corner-${corner}`}
            aria-hidden="true"
          />
        ))}
      </div>
      
      {/* Cubierta principal con composición optimizada */}
      <BookMainCover 
        isHovering={uiState.isHovering}
        isClicking={uiState.isClicking}
        spineLetters={CONFIG.SPINE_LETTERS}
        starsArray={starsArray}
        particlesArray={particlesArray}
        ctaText={uiState.isHovering ? 'Descubre los secretos' : 'Abrir grimorio'}
      />
      
      {/* Efectos de interacción */}
      <div className={`interaction-effects ${uiState.isHovering ? 'active' : ''}`}>
        <div className="hover-light"></div>
        <div className="pulse-wave"></div>
      </div>
      
      {/* Partículas mágicas con render por lote */}
      <div className="magic-particles">
        {particlesArray.map(({ id, delay }) => (
          <MagicParticle key={`particle-${id}`} id={id} delay={delay} />
        ))}
      </div>
      
      {/* Sombra dinámica */}
      <div className="dynamic-shadow"></div>
    </div>
  );
});

// Subcomponente memoizado para la cubierta principal
const BookMainCover = memo(({ 
  isHovering, 
  isClicking, 
  spineLetters, 
  starsArray,
  particlesArray,
  ctaText 
}) => (
  <div className="book-main-cover" data-interactive={isHovering || isClicking}>
    <div className="book-spine">
      <div className="spine-texture"></div>
      <div className="spine-title">
        {spineLetters.map((letter, index) => (
          <span 
            key={`spine-${index}`} 
            className="spine-letter"
            aria-hidden="true"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
    
    <div className="book-front-cover">
      <div className="cover-background">
        <div className="cover-gradient"></div>
        <div className="cover-pattern"></div>
      </div>
      
      <CoverElements starsArray={starsArray} />
      <CoverContent ctaText={ctaText} />
      
      <div className="inner-frame">
        <div className="inner-border"></div>
      </div>
    </div>
    
    <div className="book-back-cover">
      <div className="back-texture"></div>
      <div className="back-seal" aria-hidden="true">
        <div className="seal-outer">
          <div className="seal-inner">封</div>
        </div>
      </div>
    </div>
  </div>
));

BookMainCover.displayName = 'BookMainCover';

// Componente para elementos decorativos
const CoverElements = memo(({ starsArray }) => (
  <div className="cover-elements">
    <div className="subtle-glow glow-1"></div>
    <div className="subtle-glow glow-2"></div>
    
    <div className="constellations">
      {starsArray.map(id => (
        <StarPoint key={`star-${id}`} id={id} />
      ))}
    </div>
    
    <div className="decorative-lines">
      {['top', 'bottom'].map(pos => (
        <div key={`h-${pos}`} className={`decorative-line line-horizontal ${pos}`}></div>
      ))}
      {['left', 'right'].map(pos => (
        <div key={`v-${pos}`} className={`decorative-line line-vertical ${pos}`}></div>
      ))}
    </div>
  </div>
));

CoverElements.displayName = 'CoverElements';

// Componente para contenido principal
const CoverContent = memo(({ ctaText }) => (
  <div className="cover-content">
    <div className="center-glow"></div>
    
    <div className="title-container">
      <h1 className="main-title">
        <span className="title-main">Grimorio</span>
        <span className="title-sub">de Frieren</span>
      </h1>
      <div className="title-underline"></div>
    </div>
    
    <div className="elegant-separator">
      <span className="separator-ornament" aria-hidden="true">❖</span>
    </div>
    
    <p className="subtitle">
      Más allá del final del viaje
    </p>
    
    <div className="elegant-symbol" aria-hidden="true">
      <div className="symbol-circle"></div>
      <div className="symbol-core">◈</div>
    </div>
    
    <div className="styled-quote">
      <p className="quote-text">
        Un libro que susurra, acompaña y espera
      </p>
    </div>
    
    <div className="elegant-cta">
      <div className="cta-glow"></div>
      <div className="cta-content">
        <div className="cta-icon" aria-hidden="true">
          <span className="cta-hand">✋</span>
          <span className="cta-sparkle">✦</span>
        </div>
        <p className="cta-text">{ctaText}</p>
      </div>
    </div>
  </div>
));

CoverContent.displayName = 'CoverContent';

BookCover.displayName = 'BookCover';
export default BookCover;