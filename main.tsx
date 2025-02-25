import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Ensure App.tsx exists in the same directory
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found!");
}
