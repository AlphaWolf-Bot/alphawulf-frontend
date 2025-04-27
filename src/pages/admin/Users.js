import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UsersContainer = styled.div`
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

const SearchBar = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.secondaryBg};
  border: 1px solid ${props => props.theme.colors.secondaryAccent};
  border-radius: ${props => props.theme.borderRadius.small} 0 0 ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.primary};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SearchButton = styled.button`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.gradients.gold};
  color: ${props => props.theme.colors.primaryBg};
  border: none;
  border-radius: 0 ${props => props.theme.borderRadius.small} ${props => props.theme.borderRadius.small} 0;
  cursor: pointer;
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.secondaryBg};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: rgba(255, 215, 0, 0.1);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.secondaryAccent};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  padding: ${props => props.theme.spacing.md};
  text-align: left;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.accent};
`;

const TableCell = styled.td`
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-right: ${props => props.theme.spacing.xs};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.lg};
`;

const PageButton = styled.button`
  background: ${props => props.active ? props.theme.gradients.gold : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primaryBg : props.theme.colors.accent};
  border: 1px solid ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  margin: 0 ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '' : 'rgba(255, 215, 0, 0.1)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  max-width: 500px;
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

const ButtonGroup = styled.div`
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

const Users = ({ admin, token, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [awardAmount, setAwardAmount] = useState('');
  const [awardReason, setAwardReason] = useState('');
  
  const fetchUsers = async (searchQuery = '', pageNum = 1) => {
    try {
      setLoading(true);
      
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // Fetch users with pagination and search
      const response = await axios.get(`/api/admin/users?search=${searchQuery}&page=${pageNum}`, axiosConfig);
      
      if (response.data) {
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.pages);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [token]);
  
  const handleSearch = () => {
    setPage(1);
    fetchUsers(search, 1);
  };
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchUsers(search, newPage);
  };
  
  const handleAwardCoins = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setAwardAmount('');
    setAwardReason('');
  };
  
  const submitAwardCoins = async () => {
    try {
      if (!awardAmount || isNaN(parseInt(awardAmount))) {
        alert('Please enter a valid amount');
        return;
      }
      
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // Award coins to user
      await axios.post('/api/admin/award-coins', {
        userId: selectedUser._id,
        amount: parseInt(awardAmount),
        reason: awardReason || 'Admin awarded coins'
      }, axiosConfig);
      
      // Close modal and refresh users
      closeModal();
      fetchUsers(search, page);
      
    } catch (err) {
      console.error('Error awarding coins:', err);
      alert('Failed to award coins');
    }
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  return (
    <UsersContainer>
      <Sidebar>
        <Logo>ALPHA WULF</Logo>
        <NavMenu>
          <NavItem>
            <NavLink href="/admin/dashboard">Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin/users" active={true}>Users</NavLink>
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
          <Title>Users</Title>
          <UserInfo>
            <Username>{admin?.username}</Username>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>
        
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by username, name, or Telegram ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchBar>
        
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <UsersTable>
              <TableHead>
                <TableRow>
                  <TableHeader>Username</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Telegram ID</TableHeader>
                  <TableHeader>Coins</TableHeader>
                  <TableHeader>Level</TableHeader>
                  <TableHeader>Referral Code</TableHeader>
                  <TableHeader>Joined</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="8">No users found</TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow key={user._id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{`${user.firstName} ${user.lastName || ''}`}</TableCell>
                      <TableCell>{user.telegramId}</TableCell>
                      <TableCell>{user.coins}</TableCell>
                      <TableCell>{user.level}</TableCell>
                      <TableCell>{user.referralCode}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <ActionButton onClick={() => handleAwardCoins(user)}>
                          Award Coins
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </UsersTable>
            
            <Pagination>
              <PageButton
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
              >
                First
              </PageButton>
              <PageButton
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Prev
              </PageButton>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = page <= 3 ? i + 1 : page - 2 + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <PageButton
                    key={pageNum}
                    active={pageNum === page}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PageButton>
                );
              })}
              
              <PageButton
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </PageButton>
              <PageButton
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
              >
                Last
              </PageButton>
            </Pagination>
          </>
        )}
      </Content>
      
      {showModal && selectedUser && (
        <Modal>
          <ModalContent>
            <ModalTitle>Award Coins to {selectedUser.username}</ModalTitle>
            
            <FormGroup>
              <Label htmlFor="awardAmount">Amount</Label>
              <Input
                id="awardAmount"
                type="number"
                value={awardAmount}
                onChange={(e) => setAwardAmount(e.target.value)}
                placeholder="Enter amount of coins"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="awardReason">Reason (Optional)</Label>
              <Input
                id="awardReason"
                type="text"
                value={awardReason}
                onChange={(e) => setAwardReason(e.target.value)}
                placeholder="Enter reason for awarding coins"
              />
            </FormGroup>
            
            <ButtonGroup>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <SubmitButton onClick={submitAwardCoins}>Award Coins</SubmitButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </UsersContainer>
  );
};

export default Users;
