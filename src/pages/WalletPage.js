import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const WalletContainer = styled.div`
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

const CoinDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${props => props.theme.spacing.lg} 0;
`;

const CoinIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.gold};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  
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
`;

const BalanceText = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.accent};
  margin: ${props => props.theme.spacing.sm} 0;
`;

const BalanceValue = styled.span`
  font-weight: bold;
`;

const InfoCard = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InfoTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InfoContent = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.secondaryBg};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
`;

const WithdrawButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  font-size: 1rem;
`;

const SuccessMessage = styled.div`
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin: ${props => props.theme.spacing.md} 0;
  text-align: center;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const WalletPage = () => {
  const [balance, setBalance] = useState(1250);
  const [upiId, setUpiId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount, 10);
    
    if (!upiId) {
      alert('Please enter your UPI ID');
      return;
    }
    
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (amount > balance) {
      alert('Insufficient balance');
      return;
    }
    
    if (amount < 1000) {
      alert('Minimum withdrawal amount is 1000 coins');
      return;
    }
    
    // Process withdrawal
    setBalance(prevBalance => prevBalance - amount);
    setShowSuccess(true);
    setUpiId('');
    setWithdrawAmount('');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
    
    // Call API to process withdrawal
    // This will be implemented when backend is ready
  };
  
  return (
    <WalletContainer>
      <Header title="WALLET" showBack={true} />
      
      <Content>
        <CoinDisplay>
          <CoinIcon />
          <BalanceText>BALANCE: <BalanceValue>{balance}</BalanceValue> COINS</BalanceText>
        </CoinDisplay>
        
        <InfoCard>
          <InfoTitle>CONVERSION RATE:</InfoTitle>
          <InfoContent>1000 COINS = 10 INR</InfoContent>
        </InfoCard>
        
        {showSuccess && (
          <SuccessMessage>
            Your withdrawal is waiting for approval.
          </SuccessMessage>
        )}
        
        <FormGroup>
          <Label htmlFor="upiId">Enter UPI ID:</Label>
          <Input 
            id="upiId"
            type="text" 
            value={upiId} 
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@upi"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="withdrawAmount">Amount to withdraw (coins):</Label>
          <Input 
            id="withdrawAmount"
            type="number" 
            value={withdrawAmount} 
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Minimum 1000 coins"
            min="1000"
            step="100"
          />
        </FormGroup>
        
        <WithdrawButton onClick={handleWithdraw}>
          WITHDRAW COINS
        </WithdrawButton>
      </Content>
      
      <Navigation activePage="WALLET" />
    </WalletContainer>
  );
};

export default WalletPage;
