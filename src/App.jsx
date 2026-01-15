import React, { useState } from 'react';
import Login from './components/Login';
import RiderDashboard from './components/RiderDashboard';
import DriverDashboard from './components/DriverDashboard';

export default function App() {
  const [user, setUser] = useState(null); // { email, role: 'rider' | 'driver' }

  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {user.role === 'rider' ? (
        <RiderDashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <DriverDashboard user={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}