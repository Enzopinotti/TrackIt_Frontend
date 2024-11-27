import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className='logoContainer' onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
      <img src="/assets/images/logo.png" alt="Logo" />
    </div>
  );
};

export default Logo;
