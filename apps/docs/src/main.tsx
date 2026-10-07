import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PhasicProvider } from '@phasic-ui/react';
import '@phasic-ui/tokens/styles.css';
import { App } from './App';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element was not found');
}

createRoot(root).render(
  <StrictMode>
    <PhasicProvider>
      <App />
    </PhasicProvider>
  </StrictMode>,
);
