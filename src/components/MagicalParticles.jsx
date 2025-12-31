import React, { useEffect, useState, useCallback } from 'react';
import './MagicalParticles.css';

const PARTICLE_TYPES = ['float', 'sparkle', 'twinkle'];
const COLORS = [
  'rgba(200, 150, 255, 0.7)',  // Purple
  'rgba(150, 200, 255, 0.7)',  // Blue
  'rgba(255, 150, 200, 0.7)',  // Pink
  'rgba(150, 255, 200, 0.7)',  // Green
];

const MagicalParticles = ({ isActive, interactive = false }) => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const createParticles = useCallback(() => {
    // Ajustar número de partículas según el tamaño de pantalla
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile 
      ? Math.min(Math.floor(window.innerWidth / 40), 20)
      : Math.min(Math.floor(window.innerWidth / 20), 50);

    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
      const size = type === 'sparkle' 
        ? Math.random() * 3 + 2
        : Math.random() * 4 + 1;
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 7 + 3,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.3,
        type,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        originalX: Math.random() * 100,
        originalY: Math.random() * 100,
        driftSpeed: Math.random() * 0.5 + 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
      };
    });
    
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    createParticles();
    
    const handleResize = () => {
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    let animationFrameId;
    let lastTime = 0;
    
    const updateParticles = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime > 16) { // ~60fps
        setParticles(prev => 
          prev.map(p => {
            // Movimiento natural con deriva suave
            const time = timestamp / 1000;
            const driftX = Math.sin(time * p.driftSpeed + p.id) * 0.5;
            const driftY = Math.cos(time * p.driftSpeed * 0.7 + p.id) * 0.3;
            
            // Interactividad con el mouse (opcional)
            let mouseInfluenceX = 0;
            let mouseInfluenceY = 0;
            
            if (interactive) {
              const dx = (mousePos.x / window.innerWidth) * 100 - p.x;
              const dy = (mousePos.y / window.innerHeight) * 100 - p.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 20) {
                const force = (20 - distance) / 20;
                mouseInfluenceX = (dx / distance) * force * 2;
                mouseInfluenceY = (dy / distance) * force * 2;
              }
            }
            
            return {
              ...p,
              x: (p.originalX + driftX + mouseInfluenceX) % 100,
              y: (p.originalY + driftY + mouseInfluenceY) % 100,
              rotation: p.rotation + p.rotationSpeed,
            };
          })
        );
        lastTime = timestamp;
      }
      
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    
    animationFrameId = requestAnimationFrame(updateParticles);
    
    // Seguimiento del mouse para interactividad
    const handleMouseMove = (e) => {
      if (interactive) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, interactive, createParticles, mousePos]);

  if (!isActive) return null;

  return (
    <div className="magical-particles-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`magical-particle ${particle.type} ${interactive ? 'interactive' : ''}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
            background: particle.type === 'sparkle' 
              ? `radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, ${particle.color} 100%)`
              : particle.type === 'twinkle'
              ? `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, ${particle.color} 100%)`
              : `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, ${particle.color} 70%, transparent 100%)`,
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: particle.type === 'sparkle' 
              ? `0 0 15px ${particle.color}, 0 0 30px rgba(200, 100, 255, 0.4)`
              : particle.type === 'twinkle'
              ? `0 0 10px ${particle.color}`
              : 'none',
          }}
        />
      ))}
      
      {/* Efectos de luz y brillo */}
      <div className="light-effect top-glow"></div>
      <div className="light-effect bottom-glow"></div>
      <div className="light-effect left-glow"></div>
      <div className="light-effect right-glow"></div>
    </div>
  );
};

export default MagicalParticles;