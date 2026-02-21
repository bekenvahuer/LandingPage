import React from 'react';

// ✅ Definir la interfaz de props
interface FloatingButtonProps {
  onClick: () => void;
}

// ✅ Aplicar la interfaz al componente
const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button className="floating-btn" onClick={onClick}>
      📅
    </button>
  );
};

export default FloatingButton;