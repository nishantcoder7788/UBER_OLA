import React, { useState, useEffect } from 'react';
import Map from './Map';
import RideCard from '../components/RideCard';
import { LogOut, Navigation } from 'lucide-react';

const CAR_TYPES = [
  { id: 'go', name: 'UberGo', price: '₹120', time: '3 min', img: 'https://mobile-content.uber.com/one-column/87e87902-e737-4340-bc03-4f514da333d4.png' },
  { id: 'sedan', name: 'Sedan', price: '₹180', time: '5 min', img: 'https://mobile-content.uber.com/one-column/70c57c7c-486a-4950-89bc-99238383df82.png' },
];

export default function RiderDashboard({ user, onLogout }) {
  const [status, setStatus] = useState('idle'); // idle, searching, booked
  const [selectedCar, setSelectedCar] = useState('go');

  const handleRequest = () => {
    setStatus('searching');
    // Simulated backend delay
    setTimeout(() => setStatus('booked'), 3000);
  };

  return (
    <div className="relative h-screen w-full flex flex-col">
      <div className="flex-1 relative">
        <Map role="rider" />
        <button 
          onClick={onLogout}
          className="absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-xl"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-20">
        {status === 'idle' && (
          <>
            <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl mb-6">
              <Navigation size={18} className="text-blue-600" />
              <span className="font-medium">Where to?</span>
            </div>
            <div className="space-y-3">
              {CAR_TYPES.map((car) => (
                <div 
                  key={car.id}
                  onClick={() => setSelectedCar(car.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedCar === car.id ? 'border-black bg-gray-50' : 'border-transparent'}`}
                >
                  <div className="flex items-center gap-4">
                    <img src={car.img} className="w-16" alt={car.name} />
                    <div>
                      <p className="font-bold">{car.name} • {car.time}</p>
                      <p className="text-xs text-gray-500 italic text-nowrap">Affordable, compact rides</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">{car.price}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={handleRequest}
              className="w-full bg-black text-white py-4 rounded-xl mt-6 font-bold text-lg hover:bg-gray-900 active:scale-[0.98] transition"
            >
              Confirm {CAR_TYPES.find(c => c.id === selectedCar).name}
            </button>
          </>
        )}

        {status === 'searching' && (
          <div className="py-12 text-center">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-black rounded-full animate-ping opacity-20"></div>
               <div className="relative bg-black text-white p-6 rounded-full">🚖</div>
            </div>
            <h3 className="text-xl font-bold mt-6">Searching for nearby drivers...</h3>
            <p className="text-gray-500">This usually takes less than a minute</p>
          </div>
        )}

        {status === 'booked' && <RideCard status="Driver Arriving" />}
      </div>
    </div>
  );
}