// src/components/CustomModal.js

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

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

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
