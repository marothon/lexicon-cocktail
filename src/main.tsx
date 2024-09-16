import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import { RouterProvider } from 'react-router-dom';
import { routing } from './routing.tsx';
import { GlobalStateProvider } from './context/GlobalStateContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStateProvider>
      <RouterProvider router={routing} />
    </GlobalStateProvider>
    
  </StrictMode>,
)
