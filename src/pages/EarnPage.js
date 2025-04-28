import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import api from '../api'; // Axios setup
import { TailSpin } from 'react-loader-spinner'; // Spinner

function EarnPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get('/api/tasks');
        setTasks(response.data.tasks); // assuming { tasks: [ { title, reward }, ... ] }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <TailSpin height="80" width="80" color="blue" ariaLabel="loading-spinner" />
      </div>
    );
  }

  if (!tasks.length) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>No earning tasks available</h2>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Earn Rewards</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <h3>{task.title}</h3>
            <p>Reward: {task.reward} coins</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EarnPage;
