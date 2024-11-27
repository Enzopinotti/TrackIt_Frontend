// src/pages/Requerimientos/RequirementDetails.js

import React, { useState } from 'react';

function RequirementDetails({ requirement, user, onBack }) {
  const [activeTab, setActiveTab] = useState('Descripción');

  return (
    <div className="requirement-details">
      {/* Top-Bar de Requerimiento */}
        <div className="requirement-top-bar">
            <button className="back-button" onClick={onBack}>
            <img src="/assets/icons/arrow-left.png" alt="Volver" />
            </button>
            <span className="codigo">{requirement?.codigo}</span>
            <div className="status-buttons">
            <button
                className={`status-button ${requirement?.status === 'Abierto' ? 'active' : ''}`}
            >
                Abierto
            </button>
            <button
                className={`status-button ${requirement?.status === 'Asignado' ? 'active' : ''}`}
            >
                Asignado
            </button>
            <button
                className={`status-button ${requirement?.status === 'Cerrado' ? 'active' : ''}`}
            >
                Cerrado
            </button>
            </div>
            <button className="subrequirements-button">
            Sub-Requerimientos ({requirement?.subRequirementsCount || 0})
            </button>
        </div>
        <article className='requeriment-info'>
            <div className="info-container">
            <div className="first-row">
            <h2 className="title">{requirement?.title}</h2>
            <select className="priority-select" value={requirement?.priority} disabled>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
            </div>
            <div className="second-row">
            <div className="left">
                <strong>Destinatario:</strong> {requirement?.recipient || 'No asignado'}
            </div>
            <div className="right">
                <strong>Fecha de creación:</strong> {requirement?.creationDate}
            </div>
            </div>
            <div className="third-row">
            <div className="left">
                <strong>Emisor:</strong> {requirement?.sender}
            </div>
            <div className="right">
                <strong>Hora de creación:</strong> {requirement?.creationTime}
            </div>
            </div>
        </div>
        <div className="tabs">
            <button
            className={`tab ${activeTab === 'Descripción' ? 'active' : ''}`}
            onClick={() => setActiveTab('Descripción')}
            >
            Descripción
            </button>
            {user?.role === 'Admin' && (
            <button
                className={`tab ${activeTab === 'Historial' ? 'active' : ''}`}
                onClick={() => setActiveTab('Historial')}
            >
                Historial
            </button>
            )}
        </div>
        <div className="tab-content">
            {activeTab === 'Descripción' && (
            <p className="description">{requirement?.description}</p>
            )}
            {activeTab === 'Historial' && (
            <div className="history">
                {requirement?.history.map((entry) => (
                <div key={entry.id} className="history-entry">
                    <div className="action">{entry.action}</div>
                    <div className="timestamp">
                    {entry.date} {entry.time}
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </article>
      
    </div>
  );
}

export default RequirementDetails;
