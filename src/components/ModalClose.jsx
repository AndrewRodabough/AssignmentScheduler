import React from 'react';
import './Modal.css';

const ModalClose = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 10, right: 10, fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>&times;</button>
        {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ModalClose;
