// src/pages/Profile.jsx

import React, { useEffect, useState } from 'react';
import api from '../api'; // Axios setup
import { TailSpin } from 'react-loader-spinner'; // Spinner

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get('/api/user/profile');
        setProfile(response.data); // assuming { username, photoUrl, userId }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <TailSpin height="80" width="80" color="blue" ariaLabel="loading-spinner" />
      </div>
    );
  }

  if (!profile) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Failed to load profile</h2>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img 
        src={profile.photoUrl || 'https://via.placeholder.com/150'} 
        alt="Profile" 
        style={{ borderRadius: '50%', width: '120px', height: '120px' }}
      />
      <h2>{profile.username}</h2>
      <p>User ID: {profile.userId}</p>
    </div>
  );
}

export default Profile;
