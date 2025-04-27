import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SettingsContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.primaryBg};
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${props => props.theme.colors.secondaryBg};
  border-right: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.md};
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const NavLink = styled.a`
  display: block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textPrimary};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: ${props => props.active ? 'rgba(255, 215, 0, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? props.theme.colors.accent : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.05);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.accent};
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  margin-right: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CardTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.accent};
  margin: 0 0 ${props => props.theme.spacing.md} 0;
`;

const FormGroup = styled.div`
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
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primaryBg};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.gradients.gold};
  color: ${props => props.theme.colors.primaryBg};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.md};
  
  &:hover {
    opacity: 0.9;
  }
`;

const SuccessMessage = styled.div`
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.colors.error};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
`;

const Settings = ({ admin, token, onLogout }) => {
  // Admin account settings
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // App settings
  const [telegramToken, setTelegramToken] = useState('');
  const [webAppUrl, setWebAppUrl] = useState('');
  const [conversionRate, setConversionRate] = useState('10');
  
  // Messages
  const [accountSuccess, setAccountSuccess] = useState('');
  const [accountError, setAccountError] = useState('');
  const [appSuccess, setAppSuccess] = useState('');
  const [appError, setAppError] = useState('');
  
  useEffect(() => {
    if (admin) {
      setUsername(admin.username || '');
    }
    
    // Fetch app settings
    const fetchSettings = async () => {
      try {
        // Set up axios with auth header
        const axiosConfig = {
          headers: {
            'x-auth-token': token
          }
        };
        
        // In a real app, we would fetch settings from the backend
        // For now, we'll use placeholder values
        setTelegramToken('YOUR_TELEGRAM_BOT_TOKEN');
        setWebAppUrl('https://alphawolf.click');
        setConversionRate('10');
        
      } catch (error) {
        console.error('Error fetching settings:', error);
        setAppError('Failed to load settings');
      }
    };
    
    fetchSettings();
  }, [admin, token]);
  
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setAccountSuccess('');
    setAccountError('');
    
    // Validate passwords
    if (newPassword && newPassword !== confirmPassword) {
      setAccountError('New passwords do not match');
      return;
    }
    
    try {
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // In a real app, we would update the admin account
      // For now, we'll just simulate success
      
      setAccountSuccess('Account updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error('Error updating account:', error);
      setAccountError('Failed to update account');
    }
  };
  
  const handleUpdateAppSettings = async (e) => {
    e.preventDefault();
    setAppSuccess('');
    setAppError('');
    
    try {
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // In a real app, we would update the app settings
      // For now, we'll just simulate success
      
      setAppSuccess('Settings updated successfully');
      
    } catch (error) {
      console.error('Error updating settings:', error);
      setAppError('Failed to update settings');
    }
  };
  
  return (
    <SettingsContainer>
      <Sidebar>
        <Logo>ALPHA WULF</Logo>
        <NavMenu>
          <NavItem>
            <NavLink href="/admin/dashboard">Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/users">Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/withdrawals">Withdrawals</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/content">Content</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/settings" active={true}>Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/analytics">Analytics</NavLink>
          </NavItem>
        </NavMenu>
      </Sidebar>
      
      <Content>
        <Header>
          <Title>Settings</Title>
          <UserInfo>
            <Username>{admin?.username}</Username>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>
        
        <Card>
          <CardTitle>Admin Account</CardTitle>
          <form onSubmit={handleUpdateAccount}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="newPassword">New Password (leave blank to keep current)</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </FormGroup>
            
            <SubmitButton type="submit">Update Account</SubmitButton>
            
            {accountSuccess && <SuccessMessage>{accountSuccess}</SuccessMessage>}
            {accountError && <ErrorMessage>{accountError}</ErrorMessage>}
          </form>
        </Card>
        
        <Card>
          <CardTitle>App Settings</CardTitle>
          <form onSubmit={handleUpdateAppSettings}>
            <FormGroup>
              <Label htmlFor="telegramToken">Telegram Bot Token</Label>
              <Input
                id="telegramToken"
                type="text"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                placeholder="Enter Telegram Bot Token"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="webAppUrl">WebApp URL</Label>
              <Input
                id="webAppUrl"
                type="text"
                value={webAppUrl}
                onChange={(e) => setWebAppUrl(e.target.value)}
                placeholder="Enter WebApp URL"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="conversionRate">Coin to INR Conversion Rate (INR per 1000 coins)</Label>
              <Input
                id="conversionRate"
                type="number"
                value={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                placeholder="Enter conversion rate"
              />
            </FormGroup>
            
            <SubmitButton type="submit">Update Settings</SubmitButton>
            
            {appSuccess && <SuccessMessage>{appSuccess}</SuccessMessage>}
            {appError && <ErrorMessage>{appError}</ErrorMessage>}
          </form>
        </Card>
      </Content>
    </SettingsContainer>
  );
};

export default Settings;
