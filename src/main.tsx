import React from 'react';
import ReactDOM from 'react-dom/client';

// Mantine
import { MantineProvider } from '@mantine/core';
import theme from './theme';

import App from './App';
import '@styles/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
