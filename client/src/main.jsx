import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { SiteProvider } from './context/SiteContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './styles/index.css';
import { registerServiceWorker } from './utils/installApp.js';

registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SiteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
