import React from 'react';
import { Phone, MessageCircle, Star } from 'lucide-react';

const RideCard = ({ status, name, car, rating }) => {
  return (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{status}</h2>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Live</span>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=driver" alt="Driver" />
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">{name}</p>
            <p className="text-sm text-gray-500">{car}</p>
            <div className="flex items-center text-xs mt-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" /> {rating}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border rounded-full shadow-sm"><Phone size={20}/></button>
          <button className="p-3 bg-white border rounded-full shadow-sm"><MessageCircle size={20}/></button>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
          <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-0.5 h-10 bg-gray-200"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <div className="flex flex-col justify-between text-sm py-1">
              <p className="text-gray-500">Pickup: <span className="text-black font-medium">Current Location</span></p>
              <p className="text-gray-500">Drop-off: <span className="text-black font-medium">Grand Central Terminal</span></p>
          </div>
      </div>
    </div>
  );
};

export default RideCard;