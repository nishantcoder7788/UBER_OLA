import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import {
  Car, MapPin, Navigation, Star, Phone, MessageCircle,
  LogOut, Power, ShieldCheck, Clock, Loader2, ChevronRight, Zap
} from 'lucide-react';

// --- MOCK DATA & SERVICES (Consolidated to avoid resolution issues) ---

const SERVICES = [
  { id: 'uber', name: 'Uber', color: 'bg-black', icon: '🚕', basePrice: 120 },
  { id: 'ola', name: 'Ola', color: 'bg-yellow-400', icon: '🚗', basePrice: 115 },
  { id: 'rapido', name: 'Rapido', color: 'bg-yellow-500', icon: '🛵', basePrice: 85 },
  { id: 'blablacar', name: 'BlaBlaCar', color: 'bg-blue-500', icon: '🚙', basePrice: 70 },
];

const VEHICLE_TYPES = [
  {
    id: 'bike',
    name: 'Moto',
    multiplier: 0.6,
    img: 'https://m.media-amazon.com/images/I/51PR+oJRg5L._AC_UF1000,1000_QL80_.jpg',
    desc: 'Quick and affordable'
  },
  {
    id: 'auto',
    name: 'Auto',
    multiplier: 1,
    img: 'https://resize.indiatvnews.com/en/resize/oldbucket/1200_-/businessindia/IndiaTv0d3bc5_ola.jpg',
    desc: 'Common city travel'
  },
  {
    id: 'sedan',
    name: 'Sedan',
    multiplier: 1.5,
    img: 'https://cdni.autocarindia.com/ExtraImages/20230615030844_Ola.jpg',
    desc: 'Comfortable 4-seaters'
  }
];

const mockApi = {
  login: (role) => new Promise(res => setTimeout(() => res({ id: 'u1', role, name: 'Demo User' }), 1000)),
  requestRide: () => new Promise(res => setTimeout(() => res({ success: true }), 3000)),
};

// --- APP STATE ---

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload };
    case 'LOGOUT': return { ...state, user: null, rideStatus: 'IDLE' };
    case 'UPDATE_RIDE': return { ...state, rideDetails: { ...state.rideDetails, ...action.payload } };
    case 'SET_STATUS': return { ...state, rideStatus: action.payload };
    default: return state;
  }
};

// --- SHARED COMPONENTS ---

const MapPlaceholder = () => (
  <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center p-10 text-center">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
      <MapPin className="text-blue-500 animate-bounce" size={32} />
    </div>
    <h3 className="font-black text-slate-800 italic uppercase tracking-tighter text-xl">Interactive Map Interface</h3>
    <p className="text-slate-500 text-xs font-bold max-w-xs mt-2 uppercase leading-relaxed">
      GPS tracking enabled. Real-time driver positioning active for this session.
    </p>
    <div className="absolute bottom-6 right-6 flex gap-2">
      <div className="bg-white px-4 py-2 rounded-xl shadow-md text-[10px] font-black uppercase">28.6139° N</div>
      <div className="bg-white px-4 py-2 rounded-xl shadow-md text-[10px] font-black uppercase">77.2090° E</div>
    </div>
  </div>
);

// --- VIEWS ---

const RiderDashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleBook = async () => {
    dispatch({ type: 'SET_STATUS', payload: 'SEARCHING' });
    await mockApi.requestRide();
    dispatch({ type: 'SET_STATUS', payload: 'BOOKED' });
  };

  const currentProvider = SERVICES.find(s => s.id === state.rideDetails.service);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="flex-grow relative h-[45%] md:h-full">
        <MapPlaceholder />
        <button
          onClick={() => dispatch({ type: 'LOGOUT' })}
          className="absolute top-6 left-6 bg-white/80 backdrop-blur-md border border-white/40 p-3 rounded-2xl z-50 hover:bg-white transition-colors shadow-xl"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="w-full md:w-[450px] bg-white p-6 md:p-8 rounded-t-[40px] md:rounded-none shadow-2xl z-40 overflow-y-auto">
        {state.rideStatus === 'IDLE' && (
          <div className="animate-slide-up space-y-6">
            <header>
              <h2 className="text-4xl font-black tracking-tighter italic">Where to?</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Select your route & service</p>
            </header>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <input
                  className="bg-transparent w-full outline-none font-bold placeholder:text-slate-300"
                  placeholder="Your location"
                  onChange={e => dispatch({ type: 'UPDATE_RIDE', payload: { from: e.target.value } })}
                />
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-black" />
                <input
                  className="bg-transparent w-full outline-none font-bold placeholder:text-slate-300"
                  placeholder="Where are you going?"
                  onChange={e => dispatch({ type: 'UPDATE_RIDE', payload: { to: e.target.value } })}
                />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Service Provider</p>
              <div className="grid grid-cols-3 gap-2">
                {SERVICES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => dispatch({ type: 'UPDATE_RIDE', payload: { service: s.id } })}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 group ${state.rideDetails.service === s.id
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform">{s.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Rides</p>
              {VEHICLE_TYPES.map(v => (
                <div
                  key={v.id}
                  onClick={() => dispatch({ type: 'UPDATE_RIDE', payload: { vehicle: v.id } })}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${state.rideDetails.vehicle === v.id ? 'border-black bg-slate-50' : 'border-transparent hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={v.img} className="w-16 h-12 object-contain" alt={v.name} />
                    <div>
                      <p className="font-black text-sm">{v.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{v.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black">₹{Math.floor(currentProvider.basePrice * v.multiplier)}</p>
                    <p className="text-[10px] text-blue-500 font-bold">4 MIN</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-black/30 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Confirm with {currentProvider.name} <ChevronRight size={20} />
            </button>
          </div>
        )}

        {state.rideStatus === 'SEARCHING' && (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25" />
              <div className="relative bg-black p-10 rounded-full shadow-2xl">
                <Navigation className="text-white w-12 h-12" />
              </div>
            </div>
            <h3 className="text-3xl font-black mb-2 italic">Finding Driver...</h3>
            <p className="text-slate-400 font-bold max-w-[200px]">Negotiating the best fare with {currentProvider.name} partners.</p>
          </div>
        )}

        {state.rideStatus === 'BOOKED' && (
          <div className="animate-slide-up space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Driver on the way</span>
                </div>
                <h2 className="text-3xl font-black">White Swift Dzire</h2>
                <p className="text-slate-400 font-black tracking-widest">HR 26 DQ 9981</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl mb-1">
                  <img src="https://i.pravatar.cc/150?u=d1" alt="Driver" />
                </div>
                <p className="text-xs font-black">Ramesh K.</p>
                <div className="flex items-center justify-center gap-1 text-[10px] text-yellow-500 font-bold">
                  <Star size={10} className="fill-yellow-500 text-yellow-500" /> 4.9
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-slate-50 py-5 rounded-3xl font-black flex items-center justify-center gap-2 border border-slate-100">
                <Phone size={20} className="text-blue-500" /> CALL
              </button>
              <button className="bg-slate-50 py-5 rounded-3xl font-black flex items-center justify-center gap-2 border border-slate-100">
                <MessageCircle size={20} className="text-emerald-500" /> CHAT
              </button>
            </div>

            <button
              onClick={() => dispatch({ type: 'SET_STATUS', payload: 'IDLE' })}
              className="w-full py-5 text-red-500 font-black text-xs uppercase tracking-[0.2em] border-2 border-red-50 rounded-3xl hover:bg-red-50 transition-colors"
            >
              Cancel Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DriverDashboard = () => {
  const { dispatch } = useContext(AppContext);
  const [online, setOnline] = useState(false);
  const [req, setReq] = useState(null);

  useEffect(() => {
    if (online) {
      const timer = setTimeout(() => setReq({ name: 'Rahul Sharma', fare: '₹240', dist: '1.2 km' }), 2000);
      return () => clearTimeout(timer);
    }
    setReq(null);
  }, [online]);

  return (
    <div className="h-screen w-full relative bg-slate-100">
      <MapPlaceholder />
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <button
          onClick={() => dispatch({ type: 'LOGOUT' })}
          className="bg-white/80 backdrop-blur-md p-4 rounded-[1.5rem] pointer-events-auto shadow-xl"
        >
          <Power className="text-red-500" />
        </button>
        <button
          onClick={() => setOnline(!online)}
          className={`px-12 py-5 rounded-[2rem] font-black shadow-2xl transition-all pointer-events-auto transform active:scale-95 ${online ? 'bg-emerald-500 text-white' : 'bg-white text-black'
            }`}
        >
          {online ? 'ONLINE' : 'GO ONLINE'}
        </button>
      </div>

      {req && (
        <div className="absolute bottom-10 inset-x-6 animate-slide-up z-50 max-w-lg mx-auto">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-t-[12px] border-black">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Incoming Request</p>
                <h2 className="text-4xl font-black tracking-tighter italic">{req.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black">{req.fare}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{req.dist}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setReq(null)} className="bg-slate-100 py-6 rounded-[2rem] font-black text-slate-500 uppercase tracking-widest text-xs">Ignore</button>
              <button className="bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl">Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AuthScreen = () => {
  const { dispatch } = useContext(AppContext);
  const [role, setRole] = useState('rider');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await mockApi.login(role);
    dispatch({ type: 'LOGIN', payload: user });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      <div className="w-full max-w-md z-10 space-y-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-black rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl mb-8 -rotate-12">
            <Car className="text-white w-12 h-12" />
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter">CARIO</h1>
          <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mt-2">The Ultimate Commute</p>
        </div>

        <div className="bg-white p-2 rounded-[2rem] flex border border-slate-200 shadow-sm">
          <button
            onClick={() => setRole('rider')}
            className={`flex-1 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${role === 'rider' ? 'bg-black text-white shadow-xl' : 'text-slate-400'}`}
          >Rider</button>
          <button
            onClick={() => setRole('driver')}
            className={`flex-1 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${role === 'driver' ? 'bg-black text-white shadow-xl' : 'text-slate-400'}`}
          >Driver</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-3">
            <input className="w-full p-5 bg-white rounded-3xl border border-slate-100 outline-none focus:ring-4 ring-blue-500/10 font-bold" placeholder="Email" required />
            <input className="w-full p-5 bg-white rounded-3xl border border-slate-100 outline-none focus:ring-4 ring-blue-500/10 font-bold" placeholder="Password" type="password" required />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-black/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'GET STARTED'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    rideStatus: 'IDLE',
    rideDetails: { service: 'uber', vehicle: 'sedan', from: '', to: '' }
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen">
        {!state.user ? <AuthScreen /> : state.user.role === 'rider' ? <RiderDashboard /> : <DriverDashboard />}
      </div>
    </AppContext.Provider>
  );
}