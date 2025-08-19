/**
 * ModalClose - Renders a modal popup with a close (×) button and optional title.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {function} onClose - Function to call when the modal or backdrop is clicked.
 * @param {string} [title] - Optional title to display at the top of the modal.
 * @param {React.ReactNode} children - Content to display inside the modal.
 * @returns {React.ReactNode|null} The modal component if open, otherwise null.
 */

import React from 'react';
import './Modal.css';

const ModalClose = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content create-event-section" style={{ position: 'relative' }}>
        <button
          className="modal-close-btn top-right"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && <>
          <h2 style={{ marginTop: 0 }}>{title}</h2>
          <div className="modal-title-divider"></div>
        </>}
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ModalClose;
