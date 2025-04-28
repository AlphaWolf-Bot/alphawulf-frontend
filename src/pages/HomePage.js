// src/pages/Homepage.js

import React, { useEffect, useState } from 'react';
import api from '../api'; // Axios setup we created earlier
import { TailSpin } from 'react-loader-spinner'; // Spinner library

function HomePage() {
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await api.get('/api/user/balance');
        setCoins(response.data.balance); // assuming backend sends { balance: 5000 }
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="blue"
          ariaLabel="loading-spinner"
        />
      ) : (
        <>
          <h1>Welcome to AlphaWulf!</h1>
          <h2>Your Coins: {coins}</h2>
          <button style={{ marginTop: '20px' }}>Tap to Earn More!</button>
        </>
      )}
    </div>
  );
}

export default HomePage;
