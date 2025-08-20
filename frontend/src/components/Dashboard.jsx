import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import config from '../config';

function Dashboard() {
  const [moodStats, setMoodStats] = useState([]);

  useEffect(() => {
    fetchMoodStats();
  }, []);

  const fetchMoodStats = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/progress/`);
      setMoodStats(response.data);
    } catch (error) {
      console.error('Error fetching mood statistics:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Mood Statistics</h3>
      {moodStats.length === 0 ? (
        <p>No mood data available yet. Add some journal entries!</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={moodStats}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Dashboard;