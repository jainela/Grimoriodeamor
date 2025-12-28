import React, { useState } from 'react';
import './SpellForm.css';

const SpellForm = ({ onAddSpell, onClose, soundEnabled }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    meaning: '',
    notes: '',
    author: '',
    category: 'consuelo'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Definir los tipos de hechizos disponibles
  const spellTypes = [
    { id: 'consuelo', name: 'Consuelo', icon: '🤗' },
    { id: 'inspiración', name: 'Inspiración', icon: '💫' },
    { id: 'esperanza', name: 'Esperanza', icon: '🌟' },
    { id: 'recuerdo', name: 'Recuerdo', icon: '📜' },
    { id: 'sabiduría', name: 'Sabiduría', icon: '📚' },
    { id: 'amor', name: 'Amor', icon: '❤️' },
    { id: 'otros', name: 'Otros', icon: '🌀' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert('El contenido del hechizo es obligatorio');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular delay para efecto visual
    setTimeout(() => {
      onAddSpell(formData);
      setIsSubmitting(false);
      
      if (soundEnabled) {
        // Sonido de éxito
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      }
    }, 1000);
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className="spell-form-overlay" onClick={handleOverlayClick}>
      <div className="spell-form-container animate-slide-up-fade">
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          ×
        </button>
        
        <div className="form-header">
          <div className="header-icon">✨</div>
          <h2 className="form-title">Escribe un nuevo hechizo</h2>
          <p className="form-subtitle">
            Comparte palabras que puedan acompañar en momentos difíciles
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="spell-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <span className="label-icon">📝</span>
                Título del hechizo
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Conjuro de la Esperanza"
                className="form-input"
                maxLength={50}
              />
              <div className="char-count">
                {formData.title.length}/50
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="author" className="form-label">
                <span className="label-icon">✍️</span>
                Tu nombre (opcional)
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Anónimo"
                className="form-input"
                maxLength={30}
              />
            </div>
          </div>
          
          {/* Reemplazar el select por una grid de botones visuales */}
          <div className="form-group spell-types-container">
            <label className="form-label">
              <span className="label-icon">🏷️</span>
              Tipo de hechizo
            </label>
            <div className="spell-types-grid">
              {spellTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`spell-type-button ${formData.category === type.id ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(type.id)}
                >
                  <span className="spell-type-icon">{type.icon}</span>
                  <span className="spell-type-name">{type.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="content" className="form-label">
              <span className="label-icon">📖</span>
              El hechizo
              <span className="required"> *</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Escribe aquí las palabras mágicas que quieres compartir..."
              className="form-textarea"
              rows={6}
              maxLength={500}
              required
            />
            <div className="char-count">
              {formData.content.length}/500
            </div>
            <div className="form-hint">
              Estas palabras aparecerán como un hechizo en el grimorio
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="meaning" className="form-label">
              <span className="label-icon">💭</span>
              Significado o mensaje
            </label>
            <textarea
              id="meaning"
              name="meaning"
              value={formData.meaning}
              onChange={handleChange}
              placeholder="¿Qué mensaje quieres transmitir? ¿Para qué situación es este hechizo?"
              className="form-textarea"
              rows={4}
              maxLength={300}
            />
            <div className="char-count">
              {formData.meaning.length}/300
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              <span className="label-icon">🔮</span>
              Notas adicionales (opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="¿Hay alguna historia detrás de este hechizo? ¿Alguna fecha especial?"
              className="form-textarea"
              rows={3}
              maxLength={200}
            />
            <div className="char-count">
              {formData.notes.length}/200
            </div>
          </div>
          
          <div className="form-footer">
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formData.content.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✨</span>
                    Guardar en el grimorio
                  </>
                )}
              </button>
            </div>
            
            <div className="form-tips">
              <div className="tip-item">
                <span className="tip-icon">💡</span>
                <span className="tip-text">
                  Los mejores hechizos vienen del corazón y hablan con honestidad
                </span>
              </div>
            </div>
          </div>
        </form>
        
        <div className="form-magical-border"></div>
      </div>
    </div>
  );
};

export default SpellForm;