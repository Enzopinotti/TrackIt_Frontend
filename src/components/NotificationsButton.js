// src/components/NotificationsButton/NotificationsButton.js

import React from 'react';

function NotificationsButton({ onClick, count }) {
  return (
    <button
      className="notifications-button"
      onClick={onClick}
      aria-label="Ver notificaciones"
    >
      <img src="/assets/icons/notification.png" alt="Notificaciones" />
      {count > 0 && <span className="badge">{count}</span>}
    </button>
  );
}

export default NotificationsButton;