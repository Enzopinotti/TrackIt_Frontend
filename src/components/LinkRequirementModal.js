// src/components/LinkRequirementModal.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomModal from './CustomModal.js';

function LinkRequirementModal({ isOpen, onRequestClose, onSelect }) {
  const [availableRequirements, setAvailableRequirements] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // Simular la obtención de requerimientos existentes para enlazar
  useEffect(() => {
    if (isOpen) {
      // Aquí podrías hacer una llamada a la API para obtener los requerimientos
      // Para este ejemplo, usaremos datos simulados
      setAvailableRequirements([
        { id: 4, title: 'Requerimiento Extra 1' },
        { id: 5, title: 'Requerimiento Extra 2' },
        { id: 6, title: 'Requerimiento Extra 3' },
        // Agrega más requerimientos según sea necesario
      ]);
    }
  }, [isOpen]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    onSelect(selectedIds);
    setSelectedIds([]);
  };

  const handleClose = () => {
    onRequestClose();
    setSelectedIds([]);
  };

  return (
    <CustomModal isOpen={isOpen} onRequestClose={handleClose}>
      <div className="link-requirement-modal">
        <h2>Enlazar Requerimientos</h2>
        <form>
          {availableRequirements.map((req) => (
            <label key={req.id}>
              <input
                type="checkbox"
                value={req.id}
                checked={selectedIds.includes(req.id)}
                onChange={() => handleCheckboxChange(req.id)}
              />
              {req.title}
            </label>
          ))}
        </form>
        <div className="buttons">
          <button type="button" onClick={handleSubmit}>
            Enlazar
          </button>
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </div>
    </CustomModal>
  );
}

LinkRequirementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LinkRequirementModal;
