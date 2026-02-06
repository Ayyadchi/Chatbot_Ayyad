
import React from 'react';
import { Info, Crosshair } from 'lucide-react';
import { MOCK_DATA } from '../constants';

const MapView: React.FC = () => {
  // Bounding box tepat untuk Malaysia (Semenanjung ke Borneo)
  // Lng: 99.0 to 119.5 | Lat: 1.0 to 7.5
  const getX = (lng: number) => {
    return ((lng - 99.0) / (119.5 - 99.0)) * 100;
  };

  const getY = (lat: number) => {
    return (1 - (lat - 1.0) / (7.5 - 1.0)) * 100;
  };

  return (
    <div className="relative bg-[#040914] rounded-xl border border-slate-700 h-[600px] overflow-hidden shadow-2xl group ring-1 ring-slate-800">
      {/* "Realistic" Satellite/Topographic Background Mockup */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')" }}
      ></div>
      
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      {/* Region Indicators */}
      <div className="absolute bottom-20 left-12 p-3 bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded flex flex-col items-center select-none pointer-events-none">
        <span className="text-[10px] text-slate-400 font-mono">GRID REF A-1</span>
        <span className="text-xs text-slate-200 font-bold tracking-[0.3em]">WEST MALAYSIA</span>
      </div>
      <div className="absolute bottom-40 right-12 p-3 bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded flex flex-col items-center select-none pointer-events-none">
        <span className="text-[10px] text-slate-400 font-mono">GRID REF E-9</span>
        <span className="text-xs text-slate-200 font-bold tracking-[0.3em]">EAST MALAYSIA</span>
      </div>

      {/* Map Control UI */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
        <button className="bg-slate-800/80 hover:bg-blue-600 text-white p-2 rounded shadow-lg border border-slate-700 transition-all active:scale-95">+</button>
        <button className="bg-slate-800/80 hover:bg-blue-600 text-white p-2 rounded shadow-lg border border-slate-700 transition-all active:scale-95">-</button>
        <button className="bg-slate-800/80 hover:bg-emerald-600 text-white p-2 rounded shadow-lg border border-slate-700 transition-all active:scale-95"><Crosshair size={16}/></button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg shadow-xl border border-slate-700 z-10 max-w-[220px]">
        <h4 className="text-[10px] font-bold text-blue-400 uppercase mb-3 flex items-center tracking-widest">
          <Info size={12} className="mr-2" /> Geo-Spatial Intel (2025)
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"></div>
            <span className="text-[9px] text-slate-300 font-semibold tracking-wide uppercase">BBP (Stesen Utama)</span>
          </div>
          <div className="pt-2 border-t border-slate-800 mt-2">
            <p className="text-[8px] text-slate-500 italic">Jumlah Balai Terpetakan: <span className="text-blue-400 font-bold">{MOCK_DATA.length}</span></p>
          </div>
        </div>
      </div>

      {/* Fire Station Markers (All 343) */}
      <div className="absolute inset-0">
        {MOCK_DATA.map((station) => (
          <div 
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair group/pin"
            style={{ 
              left: `${getX(station.lng)}%`,
              top: `${getY(station.lat)}%`
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Pulsing ring for high-activity or just aesthetic */}
              <div className="absolute w-4 h-4 bg-red-500/20 rounded-full animate-ping pointer-events-none"></div>
              {/* Actual Pin */}
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full border border-red-400 shadow-[0_0_5px_#ef4444] group-hover/pin:scale-[2.5] transition-all duration-300"></div>
              
              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-900/95 text-white text-[9px] py-1 px-3 rounded-md opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none z-30 border border-slate-700 shadow-2xl backdrop-blur-md">
                <div className="flex flex-col space-y-0.5">
                  <span className="font-bold text-blue-400">{station.nama}</span>
                  <span className="text-slate-400 italic">{station.negeri}</span>
                  <span className="text-[8px] border-t border-slate-800 mt-1 pt-1 opacity-70">
                    LAT: {station.lat.toFixed(4)} | LNG: {station.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compass / Metadata */}
      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/60 backdrop-blur-md p-2 rounded-lg border border-slate-800/50 flex justify-between items-center px-4 shadow-lg">
        <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">
          CRS: EPSG:4326 | WGS84 GLOBAL INTEGRATION
        </p>
        <div className="flex items-center space-x-4">
           <div className="flex flex-col items-end">
             <span className="text-[8px] text-slate-500 font-mono">V-SYNC: 2025.03.A</span>
             <span className="text-[8px] text-emerald-500 font-mono">CONNECTION STABLE</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
