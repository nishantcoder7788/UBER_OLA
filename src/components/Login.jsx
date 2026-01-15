import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isRider, setIsRider] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // BACKEND: Integrate Auth API here
    onLogin({ email: 'user@example.com', role: isRider ? 'rider' : 'driver' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-black tracking-tighter text-center">CARIO CARS</h1>
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            onClick={() => setIsRider(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${isRider ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >Rider</button>
          <button 
            onClick={() => setIsRider(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${!isRider ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >Driver</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" required />
          <button type="submit" className="w-full bg-black text-white p-4 rounded-xl font-bold hover:bg-gray-800 transition">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;