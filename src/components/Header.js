import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.secondaryBg};
  border-bottom: 1px solid ${props => props.theme.colors.secondaryAccent};
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
  background: ${props => props.theme.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.accent};
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing.xs};
  box-shadow: none;
  
  &:hover {
    color: ${props => props.theme.colors.secondaryAccent};
    box-shadow: none;
    transform: none;
  }
`;

const BackButton = styled(IconButton)`
  visibility: ${props => props.showBack ? 'visible' : 'hidden'};
`;

const Header = ({ title = "ALPHA WULF", showBack = false, showProfile = true, showSettings = true }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleProfile = () => {
    navigate('/profile');
  };
  
  const handleSettings = () => {
    navigate('/settings');
  };
  
  return (
    <HeaderContainer>
      <BackButton onClick={handleBack} showBack={showBack}>
        &#8592;
      </BackButton>
      <Title>{title}</Title>
      <div>
        {showProfile && (
          <IconButton onClick={handleProfile}>
            👤
          </IconButton>
        )}
        {showSettings && (
          <IconButton onClick={handleSettings}>
            ⚙️
          </IconButton>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
