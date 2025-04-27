import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ContentContainer = styled.div`
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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.secondaryAccent};
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.accent : 'transparent'};
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textSecondary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ActionButton = styled.button`
  background: ${props => props.theme.gradients.gold};
  color: ${props => props.theme.colors.primaryBg};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.lg};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ItemsList = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  overflow: hidden;
`;

const ItemCard = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.secondaryAccent};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ItemTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  margin: 0;
  color: ${props => props.theme.colors.accent};
`;

const ItemReward = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ItemDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
`;

const ItemUrl = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.md};
  word-break: break-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
`;

const EditButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.primaryBg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ToggleButton = styled.button`
  background-color: ${props => props.active ? props.theme.colors.success : props.theme.colors.error};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  padding: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 600px;
  box-shadow: ${props => props.theme.shadows.card};
`;

const ModalTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.accent};
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primaryBg};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.primary};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const Select = styled.select`
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

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const CancelButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.gradients.gold};
  color: ${props => props.theme.colors.primaryBg};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const Content = ({ admin, token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [games, setGames] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formReward, setFormReward] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formPlatform, setFormPlatform] = useState('twitter');
  const [formMinReward, setFormMinReward] = useState('');
  const [formMaxReward, setFormMaxReward] = useState('');
  const [formEntryFee, setFormEntryFee] = useState('');
  const [formPrizePool, setFormPrizePool] = useState('');
  const [formDayOfWeek, setFormDayOfWeek] = useState('Friday');
  const [formStartTime, setFormStartTime] = useState('20:00');
  
  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // Fetch tasks
      const tasksResponse = await axios.get('/api/tasks', axiosConfig);
      if (tasksResponse.data) {
        setTasks(tasksResponse.data.tasks);
      }
      
      // Fetch games
      const gamesResponse = await axios.get('/api/games', axiosConfig);
      if (gamesResponse.data) {
        setGames(gamesResponse.data.games);
      }
      
      // Fetch tournaments
      const tournamentsResponse = await axios.get('/api/tournaments/active', axiosConfig);
      if (tournamentsResponse.data && tournamentsResponse.data.tournament) {
        setTournaments([tournamentsResponse.data.tournament]);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchContent();
  }, [token]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const openCreateModal = (type) => {
    setModalMode('create');
    setSelectedItem(null);
    resetForm();
    setActiveTab(type);
    setShowModal(true);
  };
  
  const openEditModal = (item, type) => {
    setModalMode('edit');
    setSelectedItem(item);
    
    if (type === 'tasks') {
      setFormTitle(item.title);
      setFormDescription(item.description);
      setFormReward(item.reward.toString());
      setFormUrl(item.url || '');
      setFormPlatform(item.platform || 'twitter');
    } else if (type === 'games') {
      setFormTitle(item.name);
      setFormDescription(item.description);
      setFormMinReward(item.minReward.toString());
      setFormMaxReward(item.maxReward.toString());
    } else if (type === 'tournaments') {
      setFormTitle(item.name);
      setFormDescription(item.description || '');
      setFormEntryFee(item.entryFee.toString());
      setFormPrizePool(item.prizePool.toString());
      setFormDayOfWeek(item.dayOfWeek || 'Friday');
      setFormStartTime(item.startTime || '20:00');
    }
    
    setShowModal(true);
  };
  
  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormReward('');
    setFormUrl('');
    setFormPlatform('twitter');
    setFormMinReward('');
    setFormMaxReward('');
    setFormEntryFee('');
    setFormPrizePool('');
    setFormDayOfWeek('Friday');
    setFormStartTime('20:00');
  };
  
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };
  
  const handleSubmit = async () => {
    try {
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      if (activeTab === 'tasks') {
        // Validate task form
        if (!formTitle || !formDescription || !formReward) {
          alert('Please fill in all required fields');
          return;
        }
        
        const taskData = {
          title: formTitle,
          description: formDescription,
          reward: parseInt(formReward),
          type: 'social',
          platform: formPlatform,
          url: formUrl
        };
        
        if (modalMode === 'create') {
          await axios.post('/api/admin/tasks', taskData, axiosConfig);
        } else {
          await axios.put(`/api/admin/tasks/${selectedItem._id}`, taskData, axiosConfig);
        }
      } else if (activeTab === 'games') {
        // Validate game form
        if (!formTitle || !formDescription || !formMinReward || !formMaxReward) {
          alert('Please fill in all required fields');
          return;
        }
        
        const gameData = {
          name: formTitle,
          description: formDescription,
          minReward: parseInt(formMinReward),
          maxReward: parseInt(formMaxReward)
        };
        
        if (modalMode === 'create') {
          await axios.post('/api/admin/games', gameData, axiosConfig);
        } else {
          await axios.put(`/api/admin/games/${selectedItem._id}`, gameData, axiosConfig);
        }
      } else if (activeTab === 'tournaments') {
        // Validate tournament form
        if (!formTitle || !formEntryFee || !formPrizePool) {
          alert('Please fill in all required fields');
          return;
        }
        
        const tournamentData = {
          name: formTitle,
          description: formDescription,
          entryFee: parseInt(formEntryFee),
          prizePool: parseInt(formPrizePool),
          dayOfWeek: formDayOfWeek,
          startTime: formStartTime
        };
        
        if (modalMode === 'create' || !selectedItem) {
          await axios.put('/api/admin/tournaments', tournamentData, axiosConfig);
        } else {
          await axios.put(`/api/admin/tournaments/${selectedItem._id}`, tournamentData, axiosConfig);
        }
      }
      
      // Close modal and refresh content
      closeModal();
      fetchContent();
      
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to save changes');
    }
  };
  
  const toggleItemStatus = async (item, type) => {
    try {
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      const newStatus = !item.active;
      
      if (type === 'tasks') {
        await axios.put(`/api/admin/tasks/${item._id}`, { active: newStatus }, axiosConfig);
      } else if (type === 'games') {
        await axios.put(`/api/admin/games/${item._id}`, { active: newStatus }, axiosConfig);
      } else if (type === 'tournaments') {
        await axios.put(`/api/admin/tournaments/${item._id}`, { active: newStatus }, axiosConfig);
      }
      
      // Refresh content
      fetchContent();
      
    } catch (err) {
      console.error('Error toggling status:', err);
      alert('Failed to update status');
    }
  };
  
  const renderTasksContent = () => {
    return (
      <>
        <ActionButton onClick={() => openCreateModal('tasks')}>
          Create New Task
        </ActionButton>
        
        <ItemsList>
          {tasks.length === 0 ? (
            <EmptyState>No tasks found</EmptyState>
          ) : (
            tasks.map(task => (
              <ItemCard key={task._id}>
                <ItemHeader>
                  <ItemTitle>{task.title}</ItemTitle>
                  <ItemReward>{task.reward} coins</ItemReward>
                </ItemHeader>
                <ItemDescription>{task.description}</ItemDescription>
                {task.url && <ItemUrl>URL: {task.url}</ItemUrl>}
                <ButtonGroup>
                  <EditButton onClick={() => openEditModal(task, 'tasks')}>
                    Edit
                  </EditButton>
                  <ToggleButton 
                    active={task.active}
                    onClick={() => toggleItemStatus(task, 'tasks')}
                  >
                    {task.active ? 'Active' : 'Inactive'}
                  </ToggleButton>
                </ButtonGroup>
              </ItemCard>
            ))
          )}
        </ItemsList>
      </>
    );
  };
  
  const renderGamesContent = () => {
    return (
      <>
        <ActionButton onClick={() => openCreateModal('games')}>
          Create New Game
        </ActionButton>
        
        <ItemsList>
          {games.length === 0 ? (
            <EmptyState>No games found</EmptyState>
          ) : (
            games.map(game => (
              <ItemCard key={game._id}>
                <ItemHeader>
                  <ItemTitle>{game.name}</ItemTitle>
                  <ItemReward>{game.minReward}-{game.maxReward} coins</ItemReward>
                </ItemHeader>
                <ItemDescription>{game.description}</ItemDescription>
                <ButtonGroup>
                  <EditButton onClick={() => openEditModal(game, 'games')}>
                    Edit
                  </EditButton>
                  <ToggleButton 
                    active={game.active}
                    onClick={() => toggleItemStatus(game, 'games')}
                  >
                    {game.active ? 'Active' : 'Inactive'}
                  </ToggleButton>
                </ButtonGroup>
              </ItemCard>
            ))
          )}
        </ItemsList>
      </>
    );
  };
  
  const renderTournamentsContent = () => {
    return (
      <>
        <ActionButton onClick={() => openCreateModal('tournaments')}>
          {tournaments.length === 0 ? 'Create Tournament' : 'Update Tournament'}
        </ActionButton>
        
        <ItemsList>
          {tournaments.length === 0 ? (
            <EmptyState>No tournament configured</EmptyState>
          ) : (
            tournaments.map(tournament => (
              <ItemCard key={tournament._id}>
                <ItemHeader>
                  <ItemTitle>{tournament.name}</ItemTitle>
                  <ItemReward>Prize: {tournament.prizePool} coins</ItemReward>
                </ItemHeader>
                <ItemDescription>{tournament.description}</ItemDescription>
                <div>
                  <p>Day: {tournament.dayOfWeek}</p>
                  <p>Time: {tournament.startTime}</p>
                  <p>Entry Fee: {tournament.entryFee} coins</p>
                  <p>Status: {tournament.status}</p>
                </div>
                <ButtonGroup>
                  <EditButton onClick={() => openEditModal(tournament, 'tournaments')}>
                    Edit
                  </EditButton>
                  <ToggleButton 
                    active={tournament.active}
                    onClick={() => toggleItemStatus(tournament, 'tournaments')}
                  >
                    {tournament.active ? 'Active' : 'Inactive'}
                  </ToggleButton>
                </ButtonGroup>
              </ItemCard>
            ))
          )}
        </ItemsList>
      </>
    );
  };
  
  const renderTaskForm = () => {
    return (
      <>
        <FormGroup>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description *</Label>
          <TextArea
            id="description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="reward">Reward (coins) *</Label>
          <Input
            id="reward"
            type="number"
            value={formReward}
            onChange={(e) => setFormReward(e.target.value)}
            placeholder="Enter reward amount"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="platform">Platform *</Label>
          <Select
            id="platform"
            value={formPlatform}
            onChange={(e) => setFormPlatform(e.target.value)}
          >
            <option value="twitter">Twitter</option>
            <option value="youtube">YouTube</option>
            <option value="telegram">Telegram</option>
            <option value="instagram">Instagram</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="url">URL *</Label>
          <Input
            id="url"
            type="text"
            value={formUrl}
            onChange={(e) => setFormUrl(e.target.value)}
            placeholder="Enter task URL"
          />
        </FormGroup>
      </>
    );
  };
  
  const renderGameForm = () => {
    return (
      <>
        <FormGroup>
          <Label htmlFor="title">Game Name *</Label>
          <Input
            id="title"
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter game name"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description *</Label>
          <TextArea
            id="description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Enter game description"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="minReward">Minimum Reward (coins) *</Label>
          <Input
            id="minReward"
            type="number"
            value={formMinReward}
            onChange={(e) => setFormMinReward(e.target.value)}
            placeholder="Enter minimum reward"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="maxReward">Maximum Reward (coins) *</Label>
          <Input
            id="maxReward"
            type="number"
            value={formMaxReward}
            onChange={(e) => setFormMaxReward(e.target.value)}
            placeholder="Enter maximum reward"
          />
        </FormGroup>
      </>
    );
  };
  
  const renderTournamentForm = () => {
    return (
      <>
        <FormGroup>
          <Label htmlFor="title">Tournament Name *</Label>
          <Input
            id="title"
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter tournament name"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Enter tournament description"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="dayOfWeek">Day of Week *</Label>
          <Select
            id="dayOfWeek"
            value={formDayOfWeek}
            onChange={(e) => setFormDayOfWeek(e.target.value)}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="startTime">Start Time *</Label>
          <Input
            id="startTime"
            type="text"
            value={formStartTime}
            onChange={(e) => setFormStartTime(e.target.value)}
            placeholder="Enter start time (HH:MM)"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="entryFee">Entry Fee (coins) *</Label>
          <Input
            id="entryFee"
            type="number"
            value={formEntryFee}
            onChange={(e) => setFormEntryFee(e.target.value)}
            placeholder="Enter entry fee"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="prizePool">Prize Pool (coins) *</Label>
          <Input
            id="prizePool"
            type="number"
            value={formPrizePool}
            onChange={(e) => setFormPrizePool(e.target.value)}
            placeholder="Enter prize pool"
          />
        </FormGroup>
      </>
    );
  };
  
  return (
    <ContentContainer>
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
            <NavLink href="/admin/content" active={true}>Content</NavLink>
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
          <Title>Content Management</Title>
          <UserInfo>
            <Username>{admin?.username}</Username>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'tasks'} 
            onClick={() => handleTabChange('tasks')}
          >
            Tasks
          </Tab>
          <Tab 
            active={activeTab === 'games'} 
            onClick={() => handleTabChange('games')}
          >
            Games
          </Tab>
          <Tab 
            active={activeTab === 'tournaments'} 
            onClick={() => handleTabChange('tournaments')}
          >
            Tournaments
          </Tab>
        </TabsContainer>
        
        {loading ? (
          <p>Loading content...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {activeTab === 'tasks' && renderTasksContent()}
            {activeTab === 'games' && renderGamesContent()}
            {activeTab === 'tournaments' && renderTournamentsContent()}
          </>
        )}
      </Content>
      
      {showModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>
              {modalMode === 'create' ? 'Create' : 'Edit'} {
                activeTab === 'tasks' ? 'Task' : 
                activeTab === 'games' ? 'Game' : 'Tournament'
              }
            </ModalTitle>
            
            {activeTab === 'tasks' && renderTaskForm()}
            {activeTab === 'games' && renderGameForm()}
            {activeTab === 'tournaments' && renderTournamentForm()}
            
            <ModalButtonGroup>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <SubmitButton onClick={handleSubmit}>
                {modalMode === 'create' ? 'Create' : 'Save Changes'}
              </SubmitButton>
            </ModalButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </ContentContainer>
  );
};

export default Content;
