/**
 * Modal - Renders a modal popup with a dimmed backdrop.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {function} onClose - Function to call when the modal or backdrop is clicked.
 * @param {React.ReactNode} children - Content to display inside the modal.
 * @returns {React.ReactNode|null} The modal component if open, otherwise null.
*/

import React from 'react';
import './Modal.css';

const Modal = ({ onClose, content }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {content}
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
