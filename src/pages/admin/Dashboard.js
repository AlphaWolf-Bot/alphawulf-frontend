import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DashboardContainer = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.card};
`;

const StatTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
`;

const StatValue = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.accent};
  margin: ${props => props.theme.spacing.xl} 0 ${props => props.theme.spacing.md} 0;
`;

const ActivityList = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.secondaryAccent};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActivityTime = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  opacity: 0.7;
`;

const WithdrawalsList = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  overflow: hidden;
`;

const WithdrawalItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.secondaryAccent};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const WithdrawalInfo = styled.div`
  flex: 1;
`;

const WithdrawalUser = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.textPrimary};
`;

const WithdrawalAmount = styled.div`
  color: ${props => props.theme.colors.accent};
`;

const WithdrawalUpi = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ApproveButton = styled.button`
  background-color: ${props => props.theme.colors.success};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const RejectButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Dashboard = ({ admin, token, onLogout }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeToday: 0,
    pendingWithdrawals: 0,
    coinsDistributed: 0
  });
  
  const [activities, setActivities] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Set up axios with auth header
        const axiosConfig = {
          headers: {
            'x-auth-token': token
          }
        };
        
        // Fetch dashboard stats
        const statsResponse = await axios.get('/api/admin/dashboard', axiosConfig);
        
        if (statsResponse.data) {
          setStats(statsResponse.data.stats);
          setActivities(statsResponse.data.recentActivities);
        }
        
        // Fetch pending withdrawals
        const withdrawalsResponse = await axios.get('/api/admin/withdrawals/pending', axiosConfig);
        
        if (withdrawalsResponse.data) {
          setPendingWithdrawals(withdrawalsResponse.data.withdrawals);
        }
        
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [token]);
  
  const handleProcessWithdrawal = async (withdrawalId, status) => {
    try {
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // Process withdrawal
      await axios.post('/api/admin/withdrawals/process', {
        withdrawalId,
        status
      }, axiosConfig);
      
      // Update pending withdrawals list
      setPendingWithdrawals(pendingWithdrawals.filter(w => w._id !== withdrawalId));
      
      // Update stats
      setStats({
        ...stats,
        pendingWithdrawals: stats.pendingWithdrawals - 1
      });
      
    } catch (err) {
      console.error('Error processing withdrawal:', err);
      alert('Failed to process withdrawal');
    }
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>ALPHA WULF</Logo>
        <NavMenu>
          <NavItem>
            <NavLink href="/admin/dashboard" active={true}>Dashboard</NavLink>
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
            <NavLink href="/admin/settings">Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/analytics">Analytics</NavLink>
          </NavItem>
        </NavMenu>
      </Sidebar>
      
      <Content>
        <Header>
          <Title>Dashboard</Title>
          <UserInfo>
            <Username>{admin?.username}</Username>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>
        
        {loading ? (
          <p>Loading dashboard data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <StatsGrid>
              <StatCard>
                <StatTitle>Total Users</StatTitle>
                <StatValue>{stats.totalUsers}</StatValue>
              </StatCard>
              
              <StatCard>
                <StatTitle>Active Today</StatTitle>
                <StatValue>{stats.activeToday}</StatValue>
              </StatCard>
              
              <StatCard>
                <StatTitle>Pending Withdrawals</StatTitle>
                <StatValue>{stats.pendingWithdrawals}</StatValue>
              </StatCard>
              
              <StatCard>
                <StatTitle>Coins Distributed</StatTitle>
                <StatValue>{stats.coinsDistributed}</StatValue>
              </StatCard>
            </StatsGrid>
            
            <SectionTitle>Pending Withdrawals</SectionTitle>
            <WithdrawalsList>
              {pendingWithdrawals.length === 0 ? (
                <WithdrawalItem>
                  <WithdrawalInfo>
                    <WithdrawalUser>No pending withdrawals</WithdrawalUser>
                  </WithdrawalInfo>
                </WithdrawalItem>
              ) : (
                pendingWithdrawals.slice(0, 5).map(withdrawal => (
                  <WithdrawalItem key={withdrawal._id}>
                    <WithdrawalInfo>
                      <WithdrawalUser>{withdrawal.user.username || withdrawal.user.firstName}</WithdrawalUser>
                      <WithdrawalAmount>{withdrawal.amount} coins (₹{withdrawal.amountInr})</WithdrawalAmount>
                      <WithdrawalUpi>UPI: {withdrawal.upiId}</WithdrawalUpi>
                    </WithdrawalInfo>
                    <ButtonGroup>
                      <ApproveButton onClick={() => handleProcessWithdrawal(withdrawal._id, 'approved')}>
                        Approve
                      </ApproveButton>
                      <RejectButton onClick={() => handleProcessWithdrawal(withdrawal._id, 'rejected')}>
                        Reject
                      </RejectButton>
                    </ButtonGroup>
                  </WithdrawalItem>
                ))
              )}
            </WithdrawalsList>
            
            <SectionTitle>Recent Activities</SectionTitle>
            <ActivityList>
              {activities.length === 0 ? (
                <ActivityItem>
                  <ActivityText>No recent activities</ActivityText>
                </ActivityItem>
              ) : (
                activities.map(activity => (
                  <ActivityItem key={activity._id}>
                    <ActivityText>
                      {activity.user?.username || 'User'} {activity.description} ({activity.amount} coins)
                    </ActivityText>
                    <ActivityTime>
                      {formatDate(activity.createdAt)} at {formatTime(activity.createdAt)}
                    </ActivityTime>
                  </ActivityItem>
                ))
              )}
            </ActivityList>
          </>
        )}
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
