import React, { useEffect, useState } from 'react';
import './MagicalParticles.css';

const MagicalParticles = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 25), 40);
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.4 + 0.2,
        type: Math.random() > 0.7 ? 'sparkle' : 'float'
      }));
      
      setParticles(newParticles);
    };

    createParticles();
    
    const handleResize = () => {
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: (p.x + Math.random() * 0.5 - 0.25) % 100,
          y: (p.y - Math.random() * 0.3) % 100
        }))
      );
    }, 200);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="magical-particles-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`magical-particle ${particle.type}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity
          }}
        />
      ))}
      
      {/* Efectos de luz y brillo */}
      <div className="light-effect top-glow"></div>
      <div className="light-effect bottom-glow"></div>
      <div className="light-effect left-glow"></div>
      <div className="light-effect right-glow"></div>
      
      {/* Estrellas centelleantes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="twinkle-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            fontSize: `${Math.random() * 12 + 8}px`
          }}
        >
          {Math.random() > 0.5 ? '✦' : '✧'}
        </div>
      ))}
    </div>
  );
};

export default MagicalParticles;