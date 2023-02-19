import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import config from './config';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={config.auth.auth0Domain}
    clientId={config.auth.auth0ClientId}
    redirectUri={window.location.origin}
    audience={config.auth.auth0Audience}
  >
    <App />
  </Auth0Provider>,
);
