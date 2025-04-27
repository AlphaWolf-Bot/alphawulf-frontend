import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primaryBg: '#121212',
    secondaryBg: '#1E1E1E',
    accent: '#FFD700',
    secondaryAccent: '#B8860B',
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  },
  fonts: {
    primary: "'Rajdhani', sans-serif",
    secondary: "'Orbitron', sans-serif",
  },
  gradients: {
    gold: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
    dark: 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)',
  },
  shadows: {
    glow: '0 0 10px rgba(255, 215, 0, 0.5)',
    card: '0 4px 8px rgba(0, 0, 0, 0.5)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  }
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.primaryBg};
    color: ${theme.colors.textPrimary};
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
    font-weight: 600;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.accent};
  }
  
  button {
    background: ${theme.gradients.gold};
    color: ${theme.colors.primaryBg};
    border: none;
    border-radius: ${theme.borderRadius.medium};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-family: ${theme.fonts.secondary};
    font-weight: 600;
    cursor: pointer;
    transition: all ${theme.transitions.default};
    box-shadow: ${theme.shadows.glow};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
    }
    
    &:active {
      transform: translateY(1px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  input, textarea, select {
    background-color: ${theme.colors.secondaryBg};
    border: 1px solid ${theme.colors.secondaryAccent};
    border-radius: ${theme.borderRadius.small};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    color: ${theme.colors.textPrimary};
    font-family: ${theme.fonts.primary};
    transition: all ${theme.transitions.default};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.accent};
      box-shadow: ${theme.shadows.glow};
    }
  }
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: all ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.secondaryAccent};
    }
  }
  
  .card {
    background-color: ${theme.colors.secondaryBg};
    border-radius: ${theme.borderRadius.medium};
    padding: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.md};
    box-shadow: ${theme.shadows.card};
    border: 1px solid ${theme.colors.secondaryAccent};
  }
  
  .container {
    max-width: 100%;
    padding: 0 ${theme.spacing.md};
    margin: 0 auto;
  }
  
  .gold-text {
    color: ${theme.colors.accent};
  }
  
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: ${theme.colors.secondaryBg};
    border-radius: ${theme.borderRadius.small};
    overflow: hidden;
    
    .progress {
      height: 100%;
      background: ${theme.gradients.gold};
      transition: width ${theme.transitions.default};
    }
  }
  
  .telegram-app {
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.secondaryAccent};
  }
  
  .page-content {
    flex: 1;
    padding: ${theme.spacing.md};
    overflow-y: auto;
  }
  
  .navigation {
    display: flex;
    justify-content: space-around;
    padding: ${theme.spacing.sm} 0;
    background-color: ${theme.colors.secondaryBg};
    border-top: 1px solid ${theme.colors.secondaryAccent};
    
    button {
      flex: 1;
      margin: 0 ${theme.spacing.xs};
      font-size: 12px;
    }
  }
`;

export default theme;
