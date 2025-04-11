import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  } else {
    console.error('Root element not found. Ensure there is an element with id="root" in your index.html.');
  }
});
