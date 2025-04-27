import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.spacing.xl} 0;
`;

const CoinWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  cursor: pointer;
  transition: transform 0.1s ease;
  
  &:active {
    transform: scale(0.95);
  }
`;

const CoinImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.theme.gradients.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('wolf-silhouette.png');
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.8;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${CoinWrapper}:active &::after {
    opacity: 0.5;
  }
`;

const CoinText = styled.span`
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: bold;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primaryBg};
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  z-index: 2;
`;

const TapInfo = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.accent};
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  opacity: ${props => props.opacity};
  transform: translate(${props => props.x}px, ${props => props.y}px);
  animation: particle-animation ${props => props.duration}s linear;
  
  @keyframes particle-animation {
    0% {
      transform: translate(${props => props.x}px, ${props => props.y}px);
      opacity: ${props => props.opacity};
    }
    100% {
      transform: translate(
        ${props => props.x + props.xEnd}px, 
        ${props => props.y + props.yEnd}px
      );
      opacity: 0;
    }
  }
`;

const TapToCoin = ({ onTap, remainingTaps, maxTaps }) => {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(0);
  
  const handleTap = () => {
    if (remainingTaps > 0) {
      onTap();
      createParticles();
    }
  };
  
  const createParticles = () => {
    const newParticles = [];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 8 + 4;
      const startX = 90 - size / 2;
      const startY = 90 - size / 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      const duration = 0.5 + Math.random() * 1;
      
      newParticles.push({
        id: particleId + i,
        size,
        x: startX,
        y: startY,
        xEnd: Math.cos(angle) * distance,
        yEnd: Math.sin(angle) * distance,
        opacity: 0.7 + Math.random() * 0.3,
        duration
      });
    }
    
    setParticleId(particleId + particleCount);
    setParticles([...particles, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(currentParticles => 
        currentParticles.filter(p => !newParticles.some(np => np.id === p.id))
      );
    }, 1500);
  };
  
  return (
    <CoinContainer>
      <CoinWrapper onClick={handleTap}>
        <CoinImage>
          <CoinText>TAP</CoinText>
        </CoinImage>
        <ParticleContainer>
          {particles.map(particle => (
            <Particle
              key={particle.id}
              size={particle.size}
              x={particle.x}
              y={particle.y}
              xEnd={particle.xEnd}
              yEnd={particle.yEnd}
              opacity={particle.opacity}
              duration={particle.duration}
            />
          ))}
        </ParticleContainer>
      </CoinWrapper>
      <TapInfo>Taps remaining: {remainingTaps}/{maxTaps}</TapInfo>
    </CoinContainer>
  );
};

export default TapToCoin;
