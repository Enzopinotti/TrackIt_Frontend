import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="loading-animation">
      <DotLottieReact
        autoplay
        loop
        src="/assets/videos/animacionCarga.json" // Asegúrate de la ruta
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}

export default LoadingOverlay;
