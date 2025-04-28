import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import api from '../api'; // Axios setup
import { TailSpin } from 'react-loader-spinner';

function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await api.get('/api/user/wallet');
        setWallet(response.data); // assuming API returns { coins: 5000, inrBalance: 250 }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWallet();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <TailSpin height="80" width="80" color="blue" ariaLabel="loading-spinner" />
      </div>
    );
  }

  if (!wallet) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Failed to load wallet info</h2>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Wallet Balance</h1>
      <h2>Coins: {wallet.coins}</h2>
      <h3>Equivalent in INR: ₹{wallet.inrBalance}</h3>
    </div>
  );
}

export default WalletPage;
