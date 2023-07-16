import React from 'react';
import './eventPopup.css';

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <>
        <div className="popup-overlay" onClick={onClose} />
        <div className="popup-window">
          <button className="popup-close-button" onClick={onClose}>
            ×
          </button>
          {children}
        </div>
      </>
    );
  };
  

  

export default Popup;
