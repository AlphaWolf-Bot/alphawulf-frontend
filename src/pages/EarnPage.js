import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const EarnContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px; /* Space for navigation */
`;

const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
`;

const TaskCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const TaskTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  margin: 0;
  color: ${props => props.theme.colors.accent};
`;

const TaskReward = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const TaskDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
`;

const TaskButton = styled.button`
  align-self: flex-end;
  opacity: ${props => props.completed ? 0.5 : 1};
  cursor: ${props => props.completed ? 'default' : 'pointer'};
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const CompletedBadge = styled.div`
  background-color: ${props => props.theme.colors.success};
  color: white;
  font-size: 0.8rem;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-left: ${props => props.theme.spacing.sm};
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  margin: ${props => props.theme.spacing.md} 0;
  color: ${props => props.theme.colors.accent};
`;

const EarnPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow on Twitter',
      description: 'Follow Alpha Wulf on Twitter to earn coins.',
      reward: 50,
      completed: false,
      url: 'https://twitter.com/alphawulf'
    },
    {
      id: 2,
      title: 'Subscribe on YouTube',
      description: 'Subscribe to Alpha Wulf channel on YouTube.',
      reward: 50,
      completed: false,
      url: 'https://youtube.com/alphawulf'
    },
    {
      id: 3,
      title: 'Join Telegram Group',
      description: 'Join the official Alpha Wulf Telegram group.',
      reward: 50,
      completed: false,
      url: 'https://t.me/alphawulf'
    },
    {
      id: 4,
      title: 'Follow on Instagram',
      description: 'Follow Alpha Wulf on Instagram to earn coins.',
      reward: 50,
      completed: false,
      url: 'https://instagram.com/alphawulf'
    }
  ]);
  
  const handleCompleteTask = (taskId) => {
    // In a real app, this would verify task completion with the backend
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    
    // Call API to update user data and add coins
    // This will be implemented when backend is ready
  };
  
  const openTaskUrl = (url) => {
    // In Telegram WebApp, we would use Telegram-specific methods
    // For now, just open in a new tab
    window.open(url, '_blank');
  };
  
  return (
    <EarnContainer>
      <Header title="EARN" showBack={true} />
      
      <Content>
        <SectionTitle>Social Media Tasks</SectionTitle>
        
        {tasks.map(task => (
          <TaskCard key={task.id}>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <TaskReward>{task.reward} coins</TaskReward>
            </TaskHeader>
            <TaskDescription>{task.description}</TaskDescription>
            {task.completed ? (
              <CompletedBadge>Completed</CompletedBadge>
            ) : (
              <TaskButton 
                onClick={() => {
                  openTaskUrl(task.url);
                  // In a real implementation, we would verify completion
                  // For now, just mark as completed when clicked
                  handleCompleteTask(task.id);
                }}
              >
                COMPLETE TASK
              </TaskButton>
            )}
          </TaskCard>
        ))}
      </Content>
      
      <Navigation activePage="EARN" />
    </EarnContainer>
  );
};

export default EarnPage;
