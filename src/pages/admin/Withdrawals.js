import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const WithdrawalsContainer = styled.div`
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

const WithdrawalDate = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const WithdrawalStatus = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.8rem;
  background-color: ${props => {
    switch(props.status) {
      case 'pending': return 'rgba(255, 152, 0, 0.2)';
      case 'approved': return 'rgba(76, 175, 80, 0.2)';
      case 'rejected': return 'rgba(244, 67, 54, 0.2)';
      default: return 'transparent';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return props.theme.colors.warning;
      case 'approved': return props.theme.colors.success;
      case 'rejected': return props.theme.colors.error;
      default: return props.theme.colors.textSecondary;
    }
  }};
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

const Withdrawals = ({ admin, token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [processingAction, setProcessingAction] = useState('');
  
  const fetchWithdrawals = async (status = 'pending') => {
    try {
      setLoading(true);
      
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // Fetch withdrawals based on status
      let endpoint = '/api/admin/withdrawals';
      if (status === 'pending') {
        endpoint = '/api/admin/withdrawals/pending';
      }
      
      const response = await axios.get(endpoint, axiosConfig);
      
      if (response.data) {
        // Filter withdrawals based on status if needed
        let filteredWithdrawals = response.data.withdrawals;
        if (status !== 'pending' && status !== 'all') {
          filteredWithdrawals = filteredWithdrawals.filter(w => w.status === status);
        }
        
        setWithdrawals(filteredWithdrawals);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load withdrawals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWithdrawals(activeTab);
  }, [token, activeTab]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleApprove = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setProcessingAction('approve');
    setShowModal(true);
  };
  
  const handleReject = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setProcessingAction('reject');
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedWithdrawal(null);
    setRejectReason('');
    setProcessingAction('');
  };
  
  const processWithdrawal = async () => {
    try {
      // Set up axios with auth header
      const axiosConfig = {
        headers: {
          'x-auth-token': token
        }
      };
      
      // Process withdrawal
      await axios.post('/api/admin/withdrawals/process', {
        withdrawalId: selectedWithdrawal._id,
        status: processingAction === 'approve' ? 'approved' : 'rejected',
        remarks: rejectReason
      }, axiosConfig);
      
      // Close modal and refresh withdrawals
      closeModal();
      fetchWithdrawals(activeTab);
      
    } catch (err) {
      console.error('Error processing withdrawal:', err);
      alert('Failed to process withdrawal');
    }
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <WithdrawalsContainer>
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
            <NavLink href="/admin/withdrawals" active={true}>Withdrawals</NavLink>
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
          <Title>Withdrawals</Title>
          <UserInfo>
            <Username>{admin?.username}</Username>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </UserInfo>
        </Header>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'pending'} 
            onClick={() => handleTabChange('pending')}
          >
            Pending
          </Tab>
          <Tab 
            active={activeTab === 'approved'} 
            onClick={() => handleTabChange('approved')}
          >
            Approved
          </Tab>
          <Tab 
            active={activeTab === 'rejected'} 
            onClick={() => handleTabChange('rejected')}
          >
            Rejected
          </Tab>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => handleTabChange('all')}
          >
            All
          </Tab>
        </TabsContainer>
        
        {loading ? (
          <p>Loading withdrawals...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <WithdrawalsList>
            {withdrawals.length === 0 ? (
              <EmptyState>
                No {activeTab !== 'all' ? activeTab : ''} withdrawals found
              </EmptyState>
            ) : (
              withdrawals.map(withdrawal => (
                <WithdrawalItem key={withdrawal._id}>
                  <WithdrawalInfo>
                    <WithdrawalUser>
                      {withdrawal.user?.username || withdrawal.user?.firstName || 'User'}
                    </WithdrawalUser>
                    <WithdrawalAmount>
                      {withdrawal.amount} coins (₹{withdrawal.amountInr})
                    </WithdrawalAmount>
                    <WithdrawalUpi>UPI: {withdrawal.upiId}</WithdrawalUpi>
                    <WithdrawalDate>
                      Requested: {formatDate(withdrawal.createdAt)}
                    </WithdrawalDate>
                    {withdrawal.processedAt && (
                      <WithdrawalDate>
                        Processed: {formatDate(withdrawal.processedAt)}
                      </WithdrawalDate>
                    )}
                  </WithdrawalInfo>
                  
                  <div>
                    <WithdrawalStatus status={withdrawal.status}>
                      {withdrawal.status.toUpperCase()}
                    </WithdrawalStatus>
                  </div>
                  
                  {withdrawal.status === 'pending' && (
                    <ButtonGroup>
                      <ApproveButton onClick={() => handleApprove(withdrawal)}>
                        Approve
                      </ApproveButton>
                      <RejectButton onClick={() => handleReject(withdrawal)}>
                        Reject
                      </RejectButton>
                    </ButtonGroup>
                  )}
                </WithdrawalItem>
              ))
            )}
          </WithdrawalsList>
        )}
      </Content>
      
      {showModal && selectedWithdrawal && (
        <Modal>
          <ModalContent>
            <ModalTitle>
              {processingAction === 'approve' ? 'Approve' : 'Reject'} Withdrawal
            </ModalTitle>
            
            <div>
              <p>User: {selectedWithdrawal.user?.username || 'User'}</p>
              <p>Amount: {selectedWithdrawal.amount} coins (₹{selectedWithdrawal.amountInr})</p>
              <p>UPI: {selectedWithdrawal.upiId}</p>
            </div>
            
            {processingAction === 'reject' && (
              <FormGroup>
                <Label htmlFor="rejectReason">Reason for Rejection (Optional)</Label>
                <Input
                  id="rejectReason"
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason for rejection"
                />
              </FormGroup>
            )}
            
            <ModalButtonGroup>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <SubmitButton onClick={processWithdrawal}>
                {processingAction === 'approve' ? 'Approve' : 'Reject'}
              </SubmitButton>
            </ModalButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </WithdrawalsContainer>
  );
};

export default Withdrawals;
