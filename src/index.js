import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AuthProvider } from './context/AuthContext.js';
import './styles/scss/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);


