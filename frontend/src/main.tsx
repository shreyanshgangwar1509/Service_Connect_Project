import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.js';
import './index.css';
import store from './redux/store.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider  store={store}>
      <App />
      </Provider>
  </StrictMode>
);
