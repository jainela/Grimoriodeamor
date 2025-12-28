import React, { memo, useMemo } from 'react';
import './BookPage.css';

const BookPage = memo(({ spell, side, isActive }) => {
  const pageNumber = useMemo(() => 
    spell?.page || '?', 
    [spell?.page]
  );

  const inkStains = useMemo(() => 
    [...Array(3)].map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${20 + Math.random() * 60}%`,
      width: `${Math.random() * 40 + 20}px`,
      height: `${Math.random() * 40 + 20}px`,
      opacity: 0.05 + Math.random() * 0.05
    })),
    []
  );

  const ageLines = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      id: i,
      top: `${15 + i * 10}%`,
      opacity: 0.1 + Math.random() * 0.1,
      rotation: `${Math.random() * 1 - 0.5}deg`
    })),
    []
  );

  const renderEmptyPage = () => (
    <div className={`book-page ${side} ${isActive ? 'active' : ''}`}>
      <div className="paper-texture"></div>
      <div className="page-content">
        <div className="page-number">
          <span className="page-number-decor">❧</span>
          <span className="page-number-text">Página {pageNumber}</span>
          <span className="page-number-decor">❧</span>
        </div>
        
        <div className="empty-page-message">
          <div className="empty-symbol">📖</div>
          <h3>Página en Blanco</h3>
          <p>Esta página está esperando tus palabras...</p>
          <div className="empty-hint">
            <small>Escribe un hechizo para llenar esta página con magia</small>
          </div>
        </div>
        
        <div className="page-footer">
          <div className="footer-border"></div>
          <div className="footer-symbols">
            <span>✦</span>
            <span>✧</span>
            <span>❁</span>
            <span>✧</span>
            <span>✦</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpellPage = () => (
    <div className={`book-page ${side} ${isActive ? 'active' : ''}`}>
      <div className="paper-texture"></div>
      
      {/* Decoraciones de página */}
      <div className="page-corner top-left"></div>
      <div className="page-corner top-right"></div>
      <div className="page-corner bottom-left"></div>
      <div className="page-corner bottom-right"></div>
      
      <div className="page-content">
        {/* Encabezado */}
        <div className="page-header">
          <div className="page-symbol">{side === 'left' ? '«' : '»'}</div>
          <div className="page-title">Hechizo #{spell.page}</div>
          <div className="page-symbol">✦</div>
        </div>
        
        {/* Título */}
        <div className="spell-title-container">
          <div className="title-border-top"></div>
          <h2 className="spell-title" title={spell.title || "Hechizo sin nombre"}>
            {spell.title || "Hechizo sin nombre"}
          </h2>
          <div className="title-border-bottom"></div>
        </div>
        
        {/* Contenido principal */}
        <div className="spell-content">
          <div className="spell-border">
            <div className="spell-quote">"</div>
            <p className="spell-text">{spell.content}</p>
            <div className="spell-quote">"</div>
          </div>
          
          {/* Significado */}
          {spell.meaning && (
            <div className="spell-meaning" aria-label="Significado del hechizo">
              <h4 className="meaning-title">
                <span className="meaning-icon" aria-hidden="true">📜</span>
                Para cuando necesites recordar...
              </h4>
              <p className="meaning-text">{spell.meaning}</p>
            </div>
          )}
          
          {/* Notas adicionales */}
          {spell.notes && (
            <div className="spell-notes">
              <div className="notes-icon" aria-hidden="true">💭</div>
              <p className="notes-text">{spell.notes}</p>
            </div>
          )}
        </div>
        
        {/* Pie de página */}
        <div className="page-footer">
          <div className="footer-info">
            <div className="footer-author">
              <span className="author-label">Escrito por:</span>
              <span className="author-name">{spell.author || "Anónimo"}</span>
            </div>
            <div className="footer-date">
              <span className="date-label">En:</span>
              <span className="date-value">{spell.date || "Un día mágico"}</span>
            </div>
          </div>
          
          <div className="footer-border"></div>
          
          <div className="footer-symbols">
            <span className="symbol-glow">✦</span>
            <span>❁</span>
            <span className="symbol-glow">✧</span>
            <span>❁</span>
            <span className="symbol-glow">✦</span>
          </div>
        </div>
      </div>
      
      {/* Líneas de texto antiguo */}
      <div className="age-lines" aria-hidden="true">
        {ageLines.map((line) => (
          <div 
            key={line.id}
            className="age-line"
            style={{
              top: line.top,
              opacity: line.opacity,
              transform: `rotate(${line.rotation})`
            }}
          />
        ))}
      </div>
      
      {/* Manchas de tinta */}
      <div className="ink-stains" aria-hidden="true">
        {inkStains.map((stain) => (
          <div 
            key={stain.id}
            className="ink-stain"
            style={{
              left: stain.left,
              top: stain.top,
              width: stain.width,
              height: stain.height,
              opacity: stain.opacity
            }}
          />
        ))}
      </div>
    </div>
  );

  if (!spell) {
    return renderEmptyPage();
  }

  return renderSpellPage();
});

BookPage.displayName = 'BookPage';
export default BookPage;