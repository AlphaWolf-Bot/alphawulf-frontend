import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/styles';

// Import pages
import HomePage from './pages/HomePage';
import EarnPage from './pages/EarnPage';
import WalletPage from './pages/WalletPage';
import FriendsPage from './pages/FriendsPage';
import GamesPage from './pages/GamesPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
