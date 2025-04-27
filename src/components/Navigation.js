import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  background-color: ${props => props.theme.colors.secondaryBg};
  border-top: 1px solid ${props => props.theme.colors.secondaryAccent};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const NavButton = styled.button`
  flex: 1;
  margin: 0 ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: 0.8rem;
  background: ${props => props.active ? props.theme.gradients.gold : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primaryBg : props.theme.colors.accent};
  border: ${props => props.active ? 'none' : `1px solid ${props.theme.colors.secondaryAccent}`};
  box-shadow: ${props => props.active ? props.theme.shadows.glow : 'none'};
  
  &:hover {
    background: ${props => props.active ? props.theme.gradients.gold : 'rgba(255, 215, 0, 0.1)'};
    transform: translateY(-2px);
  }
`;

const Navigation = ({ activePage }) => {
  const navigate = useNavigate();
  
  const pages = [
    { name: 'HOME', path: '/' },
    { name: 'EARN', path: '/earn' },
    { name: 'WALLET', path: '/wallet' },
    { name: 'FRIENDS', path: '/friends' },
    { name: 'GAMES', path: '/games' }
  ];
  
  return (
    <NavContainer>
      {pages.map((page) => (
        <NavButton 
          key={page.name}
          active={activePage === page.name}
          onClick={() => navigate(page.path)}
        >
          {page.name}
        </NavButton>
      ))}
    </NavContainer>
  );
};

export default Navigation;
