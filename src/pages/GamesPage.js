import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const GamesContainer = styled.div`
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

const GameCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const GameTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  margin: 0;
  color: ${props => props.theme.colors.accent};
`;

const GameReward = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const GameDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
`;

const GameButton = styled.button`
  align-self: flex-end;
`;

const TournamentCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 2px solid ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.lg} 0;
  box-shadow: ${props => props.theme.shadows.glow};
`;

const TournamentTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.accent};
  text-align: center;
`;

const TournamentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TournamentDetail = styled.p`
  font-size: 1rem;
  margin: ${props => props.theme.spacing.xs} 0;
  color: ${props => props.theme.colors.textSecondary};
`;

const PrizePool = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.accent};
  margin: ${props => props.theme.spacing.md} 0;
  text-align: center;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  font-size: 1rem;
  margin-top: ${props => props.theme.spacing.md};
`;

const GamesPage = () => {
  const [games] = useState([
    {
      id: 1,
      title: 'WOLF RUNNER',
      description: 'Run and jump to collect coins while avoiding obstacles.',
      minReward: 10,
      maxReward: 20
    },
    {
      id: 2,
      title: 'COIN FLIP',
      description: 'Guess the outcome of a coin flip to win coins.',
      minReward: 10,
      maxReward: 30
    },
    {
      id: 3,
      title: 'MEMORY MATCH',
      description: 'Match pairs of cards to earn coins. The faster you match, the more you earn.',
      minReward: 20,
      maxReward: 40
    },
    {
      id: 4,
      title: 'WOLF HUNT',
      description: 'Hunt for hidden wolves in a limited time to earn maximum coins.',
      minReward: 30,
      maxReward: 50
    }
  ]);
  
  const [tournament] = useState({
    title: 'ALPHA BATTLE',
    day: 'Friday',
    time: '8:00 PM',
    prizePool: 10000,
    entryFee: 100,
    registered: false
  });
  
  const playGame = (gameId) => {
    // In a real app, this would navigate to the game
    alert(`Game ${gameId} will launch soon!`);
    
    // Call API to launch game
    // This will be implemented when backend is ready
  };
  
  const registerForTournament = () => {
    // In a real app, this would register the user for the tournament
    alert('You have been registered for the tournament!');
    
    // Call API to register for tournament
    // This will be implemented when backend is ready
  };
  
  // Calculate days until next Friday
  const getDaysUntilFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    const daysUntilFriday = (5 + 7 - dayOfWeek) % 7;
    return daysUntilFriday === 0 ? 'Today' : `${daysUntilFriday} days`;
  };
  
  return (
    <GamesContainer>
      <Header title="GAMES" showBack={true} />
      
      <Content>
        <SectionTitle>MINI GAMES</SectionTitle>
        
        {games.map(game => (
          <GameCard key={game.id}>
            <GameHeader>
              <GameTitle>{game.title}</GameTitle>
              <GameReward>Reward: {game.minReward}-{game.maxReward} coins</GameReward>
            </GameHeader>
            <GameDescription>{game.description}</GameDescription>
            <GameButton onClick={() => playGame(game.id)}>
              PLAY NOW
            </GameButton>
          </GameCard>
        ))}
        
        <SectionTitle>WEEKLY TOURNAMENT</SectionTitle>
        
        <TournamentCard>
          <TournamentTitle>{tournament.title}</TournamentTitle>
          <TournamentInfo>
            <TournamentDetail>Every {tournament.day} at {tournament.time}</TournamentDetail>
            <TournamentDetail>Next tournament: {getDaysUntilFriday()}</TournamentDetail>
            <TournamentDetail>Entry Fee: {tournament.entryFee} coins</TournamentDetail>
          </TournamentInfo>
          <PrizePool>Prize Pool: {tournament.prizePool} coins</PrizePool>
          <RegisterButton onClick={registerForTournament}>
            {tournament.registered ? 'REGISTERED' : 'REGISTER NOW'}
          </RegisterButton>
        </TournamentCard>
      </Content>
      
      <Navigation activePage="GAMES" />
    </GamesContainer>
  );
};

export default GamesPage;
