import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px; /* Space for navigation */
`;

const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  margin: ${props => props.theme.spacing.md} 0;
  color: ${props => props.theme.colors.accent};
`;

const ReferralCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.glow};
`;

const ReferralCode = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  margin: ${props => props.theme.spacing.md} 0;
  letter-spacing: 2px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 0.9rem;
`;

const FriendCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FriendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FriendName = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  margin: 0;
  color: ${props => props.theme.colors.accent};
`;

const FriendLevel = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  background-color: rgba(255, 215, 0, 0.1);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const FriendInfo = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

const TotalEarnings = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.accent};
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const FriendsPage = () => {
  const [referralCode] = useState('ALPHA123456');
  const [friends] = useState([
    {
      id: 1,
      name: 'RajWolf',
      level: 3,
      joinedDays: 2
    },
    {
      id: 2,
      name: 'WolfHunter',
      level: 7,
      joinedDays: 5
    },
    {
      id: 3,
      name: 'NightWolf',
      level: 2,
      joinedDays: 7
    }
  ]);
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
      .then(() => {
        alert('Referral code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const shareReferralCode = () => {
    // In a real Telegram WebApp, we would use Telegram-specific sharing methods
    // For now, just simulate sharing
    if (navigator.share) {
      navigator.share({
        title: 'Join Alpha Wulf',
        text: `Join Alpha Wulf with my referral code: ${referralCode} and earn 50 coins!`,
        url: 'https://alphawolf.click'
      }).catch(err => {
        console.error('Share failed:', err);
      });
    } else {
      alert('Sharing is not supported on this browser');
    }
  };
  
  const totalEarnings = friends.length * 50; // 50 coins per referral
  
  return (
    <FriendsContainer>
      <Header title="FRIENDS" showBack={true} />
      
      <Content>
        <SectionTitle>YOUR REFERRAL CODE:</SectionTitle>
        
        <ReferralCard>
          <ReferralCode>{referralCode}</ReferralCode>
          <ButtonGroup>
            <ActionButton onClick={copyReferralCode}>COPY</ActionButton>
            <ActionButton onClick={shareReferralCode}>SHARE</ActionButton>
          </ButtonGroup>
        </ReferralCard>
        
        <SectionTitle>YOUR WOLF PACK:</SectionTitle>
        
        {friends.map(friend => (
          <FriendCard key={friend.id}>
            <FriendHeader>
              <FriendName>{friend.name}</FriendName>
              <FriendLevel>Level {friend.level}</FriendLevel>
            </FriendHeader>
            <FriendInfo>
              Joined: {friend.joinedDays} {friend.joinedDays === 1 ? 'day' : 'days'} ago
            </FriendInfo>
          </FriendCard>
        ))}
        
        <TotalEarnings>
          Total Referral Earnings: {totalEarnings} coins
        </TotalEarnings>
      </Content>
      
      <Navigation activePage="FRIENDS" />
    </FriendsContainer>
  );
};

export default FriendsPage;
