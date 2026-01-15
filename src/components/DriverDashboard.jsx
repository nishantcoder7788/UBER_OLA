import React, { useState } from 'react';
import Map from './Map';
import { Power } from 'lucide-react';

export default function DriverDashboard({ user, onLogout }) {
  const [isOnline, setIsOnline] = useState(false);
  const [request, setRequest] = useState(null);

  // Simulate receiving a ride request
  const toggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      setTimeout(() => setRequest({ id: 1, rider: 'Sarah', distance: '1.2 km' }), 2000);
    } else {
      setRequest(null);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Map role="driver" />
      
      <div className="absolute top-4 inset-x-4 flex justify-between items-center pointer-events-none">
        <button onClick={onLogout} className="bg-white p-3 rounded-full shadow-lg pointer-events-auto">
          <Power size={20} className="text-red-500" />
        </button>
        <button 
          onClick={toggleOnline}
          className={`px-6 py-2 rounded-full font-bold shadow-lg pointer-events-auto transition ${isOnline ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
        >
          {isOnline ? 'ONLINE' : 'GO ONLINE'}
        </button>
      </div>

      {request && (
        <div className="absolute bottom-8 inset-x-4 animate-bounce-in">
          <div className="bg-white p-6 rounded-3xl shadow-2xl border-2 border-black">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">New Request</p>
                <h2 className="text-2xl font-black">{request.rider}</h2>
              </div>
              <span className="bg-gray-100 px-3 py-1 rounded-lg font-bold">{request.distance}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setRequest(null)} className="flex-1 bg-gray-100 py-4 rounded-xl font-bold">Ignore</button>
              <button className="flex-1 bg-black text-white py-4 rounded-xl font-bold">Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}