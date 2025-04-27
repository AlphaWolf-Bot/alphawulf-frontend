import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ProgressBar from '../components/ProgressBar';
import TapToCoin from '../components/TapToCoin';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px; /* Space for navigation */
`;

const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  const [userData, setUserData] = useState({
    level: 5,
    experience: 65,
    maxExperience: 100,
    coins: 1250,
    remainingTaps: 78,
    maxTaps: 100,
    lastTapReset: new Date().getTime()
  });
  
  // Check if taps should be reset (every 4 hours)
  useEffect(() => {
    const checkTapReset = () => {
      const now = new Date().getTime();
      const fourHoursInMs = 4 * 60 * 60 * 1000;
      
      if (now - userData.lastTapReset > fourHoursInMs) {
        setUserData(prev => ({
          ...prev,
          remainingTaps: prev.maxTaps,
          lastTapReset: now
        }));
      }
    };
    
    checkTapReset();
    const interval = setInterval(checkTapReset, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [userData.lastTapReset]);
  
  const handleTap = () => {
    if (userData.remainingTaps > 0) {
      setUserData(prev => ({
        ...prev,
        coins: prev.coins + 5,
        remainingTaps: prev.remainingTaps - 1,
        experience: Math.min(prev.maxExperience, prev.experience + 1)
      }));
      
      // Call API to update user data
      // This will be implemented when backend is ready
    }
  };
  
  return (
    <HomeContainer>
      <Header title="ALPHA WULF" showBack={false} />
      
      <Content>
        <ProgressBar 
          current={userData.experience} 
          max={userData.maxExperience} 
          level={userData.level} 
        />
        
        <TapToCoin 
          onTap={handleTap} 
          remainingTaps={userData.remainingTaps} 
          maxTaps={userData.maxTaps} 
        />
      </Content>
      
      <Navigation activePage="HOME" />
    </HomeContainer>
  );
};

export default HomePage;
