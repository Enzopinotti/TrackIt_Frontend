// src/components/CustomModal.js

import React from 'react';
import ReactModal from 'react-modal';

// Establecer el elemento raíz para accesibilidad
ReactModal.setAppElement('#root');

function CustomModal({ isOpen, onRequestClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="overlay"
      className="modal-content"
      closeTimeoutMS={200} 
    >
      {children}
    </ReactModal>
  );
}

export default CustomModal;
