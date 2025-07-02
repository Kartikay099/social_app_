import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Chats from './pages/Chats.jsx';
import Notifications from './pages/Notifications.jsx'; // If you have this page

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Add more routes here if needed */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
