import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsContainer = styled.div`
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

const DateRangeSelector = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const DateRangeButton = styled.button`
  background: ${props => props.active ? props.theme.gradients.gold : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primaryBg : props.theme.colors.accent};
  border: 1px solid ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  margin-left: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '' : 'rgba(255, 215, 0, 0.1)'};
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.card};
`;

const ChartTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.accent};
  margin: 0 0 ${props => props.theme.spacing.md} 0;
`;

const Analytics = ({ admin, token, onLogout }) => {
  const [dateRange, setDateRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    coinDistribution: [],
    taskCompletion: [],
    gameActivity: [],
    withdrawalStats: [],
    referralStats: []
  });
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Set up axios with auth header
        const axiosConfig = {
          headers: {
            'x-auth-token': token
          }
        };
        
        // In a real app, we would fetch analytics data from the backend
        // For now, we'll use mock data
        
        // Generate dates for the selected range
        const dates = generateDates(dateRange);
        
        // Mock data for user growth
        const userGrowth = dates.map((date, index) => ({
          date,
          newUsers: Math.floor(Math.random() * 20) + 5,
          activeUsers: Math.floor(Math.random() * 50) + 20
        }));
        
        // Mock data for coin distribution
        const coinDistribution = [
          { category: 'Taps', amount: Math.floor(Math.random() * 50000) + 10000 },
          { category: 'Tasks', amount: Math.floor(Math.random() * 30000) + 5000 },
          { category: 'Games', amount: Math.floor(Math.random() * 20000) + 3000 },
          { category: 'Tournaments', amount: Math.floor(Math.random() * 10000) + 2000 },
          { category: 'Referrals', amount: Math.floor(Math.random() * 15000) + 4000 }
        ];
        
        // Mock data for task completion
        const taskCompletion = dates.map((date, index) => ({
          date,
          completions: Math.floor(Math.random() * 100) + 20
        }));
        
        // Mock data for game activity
        const gameActivity = [
          { game: 'Game 1', plays: Math.floor(Math.random() * 500) + 100 },
          { game: 'Game 2', plays: Math.floor(Math.random() * 400) + 80 },
          { game: 'Game 3', plays: Math.floor(Math.random() * 300) + 60 },
          { game: 'Game 4', plays: Math.floor(Math.random() * 200) + 40 }
        ];
        
        // Mock data for withdrawal stats
        const withdrawalStats = dates.map((date, index) => ({
          date,
          amount: Math.floor(Math.random() * 1000) + 200,
          count: Math.floor(Math.random() * 10) + 2
        }));
        
        // Mock data for referral stats
        const referralStats = dates.map((date, index) => ({
          date,
          referrals: Math.floor(Math.random() * 15) + 3
        }));
        
        setAnalyticsData({
          userGrowth,
          coinDistribution,
          taskCompletion,
          gameActivity,
          withdrawalStats,
          referralStats
        });
        
        setError('');
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [token, dateRange]);
  
  const generateDates = (range) => {
    const dates = [];
    const today = new Date();
    let daysToSubtract;
    
    switch (range) {
      case 'week':
        daysToSubtract = 7;
        break;
      case 'month':
        daysToSubtract = 30;
        break;
      case 'year':
        daysToSubtract = 365;
        break;
      default:
        daysToSubtract = 7;
    }
    
    for (let i = daysToSubtract - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }
    
    return dates;
  };
  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Chart configurations
  const userGrowthChart = {
    labels: analyticsData.userGrowth.map(item => item.date),
    datasets: [
      {
        label: 'New Users',
        data: analyticsData.userGrowth.map(item => item.newUsers),
        borderColor: 'rgba(255, 215, 0, 1)',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        tension: 0.4
      },
      {
        label: 'Active Users',
        data: analyticsData.userGrowth.map(item => item.activeUsers),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  };
  
  const coinDistributionChart = {
    labels: analyticsData.coinDistribution.map(item => item.category),
    datasets: [
      {
        data: analyticsData.coinDistribution.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 215, 0, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ],
        borderColor: [
          'rgba(255, 215, 0, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const taskCompletionChart = {
    labels: analyticsData.taskCompletion.map(item => item.date),
    datasets: [
      {
        label: 'Task Completions',
        data: analyticsData.taskCompletion.map(item => item.completions),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const gameActivityChart = {
    labels: analyticsData.gameActivity.map(item => item.game),
    datasets: [
      {
        label: 'Game Plays',
        data: analyticsData.gameActivity.map(item => item.plays),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const withdrawalStatsChart = {
    labels: analyticsData.withdrawalStats.map(item => item.date),
    datasets: [
      {
        label: 'Withdrawal Amount (INR)',
        data: analyticsData.withdrawalStats.map(item => item.amount),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Withdrawal Count',
        data: analyticsData.withdrawalStats.map(item => item.count),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };
  
  const referralStatsChart = {
    labels: analyticsData.referralStats.map(item => item.date),
    datasets: [
      {
        label: 'Referrals',
        data: analyticsData.referralStats.map(item => item.referrals),
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e0e0e0'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e0e0e0'
        }
      }
    }
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e0e0e0'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e0e0e0'
        }
      }
    }
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0'
        }
      }
    }
  };
  
  const withdrawalOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e0e0e0'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e0e0e0'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: '#e0e0e0'
        }
      }
    }
  };
  
  return (
    <AnalyticsContainer>
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
            <NavLink href="/admin/settings">Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/analytics" active={true}>Analytics</NavLink>
          </NavItem>
        </NavMenu>
      </Sidebar>
      
      <Content>
        <Header>
          <Title>Analytics</Title>
          <UserInfo>
            <Username>{admin?.username}</Username>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>
        
        <DateRangeSelector>
          <DateRangeButton 
            active={dateRange === 'week'} 
            onClick={() => setDateRange('week')}
          >
            Last Week
          </DateRangeButton>
          <DateRangeButton 
            active={dateRange === 'month'} 
            onClick={() => setDateRange('month')}
          >
            Last Month
          </DateRangeButton>
          <DateRangeButton 
            active={dateRange === 'year'} 
            onClick={() => setDateRange('year')}
          >
            Last Year
          </DateRangeButton>
        </DateRangeSelector>
        
        {loading ? (
          <p>Loading analytics data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ChartGrid>
            <ChartCard>
              <ChartTitle>User Growth</ChartTitle>
              <Line data={userGrowthChart} options={lineOptions} />
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>Coin Distribution</ChartTitle>
              <Pie data={coinDistributionChart} options={pieOptions} />
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>Task Completions</ChartTitle>
              <Bar data={taskCompletionChart} options={barOptions} />
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>Game Activity</ChartTitle>
              <Bar data={gameActivityChart} options={barOptions} />
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>Withdrawal Statistics</ChartTitle>
              <Line data={withdrawalStatsChart} options={withdrawalOptions} />
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>Referral Activity</ChartTitle>
              <Bar data={referralStatsChart} options={barOptions} />
            </ChartCard>
          </ChartGrid>
        )}
      </Content>
    </AnalyticsContainer>
  );
};

export default Analytics;
