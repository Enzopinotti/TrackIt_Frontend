import { useNavigate } from 'react-router';

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleLogoKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLogoClick();
    }
  };

  return (
    <div
      className='logoContainer'
      onClick={handleLogoClick}
      onKeyDown={handleLogoKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Ir al inicio"
      style={{ cursor: 'pointer' }}
    >
      <img src="/assets/images/logo.png" alt="Logo" />
    </div>
  );
};

export default Logo;
