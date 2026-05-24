import React, { useState } from 'react';
import Login from './components/Login';
import LeadList from './components/LeadList';
import './App.css';

export default function App() {
  const [user, setUser] = useState(localStorage.getItem('username'));

  if (!user) return <Login onLogin={(u) => setUser(u)} />;
  return <LeadList />;
}
