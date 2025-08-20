import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './components/Chat';
import Journal from './components/Journal';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth'; // Import Auth component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }, []);

  const handleAuthSuccess = () => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    setIsAuthenticated(true);
    setUsername(storedUsername);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    delete axios.defaults.headers.common['Authorization'];
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Mental Wellness App</h1>
        </header>
        <main>
          <Auth onAuthSuccess={handleAuthSuccess} />
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mental Wellness App</h1>
        <p>Welcome, {username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <nav>
        <ul>
          <li><a href="#chat">Chat</a></li>
          <li><a href="#journal">Journal</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
        </ul>
      </nav>
      <main>
        <section id="chat">
          <Chat />
        </section>

        <section id="journal">
          <Journal />
        </section>

        <section id="dashboard">
          <Dashboard />
        </section>
      </main>
    </div>
  );
}

export default App;