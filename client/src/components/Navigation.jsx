import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <h1>MERN Testing Portal</h1>
      {user ? (
        <div>
          <span>Welcome, {user.username}</span>
          <Button variant="secondary" size="sm" onClick={logout} style={{ marginLeft: '0.5rem' }}>
            Logout
          </Button>
        </div>
      ) : (
        <span>Guest</span>
      )}
    </header>
  );
};

export default Navigation;

