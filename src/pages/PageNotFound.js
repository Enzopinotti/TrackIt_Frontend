import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const PageNotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <Player
      autoplay
      loop
      src="https://assets2.lottiefiles.com/packages/lf20_khzniaya.json"
      style={{ height: '300px', width: '300px' }}
    />
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, no pudimos encontrar la página que buscas.</p>
  </div>
);

export default PageNotFound;
