import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
  margin: ${props => props.theme.spacing.md} 0;
`;

const ProgressTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xs};
  
  span {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 0.9rem;
    color: ${props => props.theme.colors.accent};
  }
`;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  overflow: hidden;
  position: relative;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: ${props => props.theme.gradients.gold};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: width 0.5s ease;
  box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
`;

const LevelName = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xs};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.accent};
`;

const getLevelName = (level) => {
  const levels = {
    1: 'Wolf Pup',
    2: 'Lone Wolf',
    3: 'Pack Hunter',
    4: 'Alpha Tracker',
    5: 'Alpha Hunter',
    6: 'Pack Leader',
    7: 'Night Stalker',
    8: 'Wolf King',
    9: 'Legendary Alpha',
    10: 'Immortal Wolf'
  };
  
  return levels[level] || `Level ${level}`;
};

const ProgressBar = ({ current, max, level }) => {
  const progress = Math.min(100, (current / max) * 100);
  const levelName = getLevelName(level);
  
  return (
    <ProgressContainer>
      <ProgressTitle>
        <span>Level {level}</span>
        <span>{current}/{max}</span>
      </ProgressTitle>
      <ProgressBarOuter>
        <ProgressBarInner progress={progress} />
      </ProgressBarOuter>
      <LevelName>{levelName}</LevelName>
    </ProgressContainer>
  );
};

export default ProgressBar;
