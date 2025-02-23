import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="loading-animation">
      <Player
        autoplay
        loop
        src="/assets/videos/animacionCarga.json" // Asegúrate de la ruta
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}

export default LoadingOverlay;
