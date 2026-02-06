
import React from 'react';
import { 
  Flame, 
  Users, 
  Building2, 
  Map as MapIcon, 
  TrendingUp, 
  FileSearch,
  LayoutDashboard,
  ShieldCheck,
  Zap
} from 'lucide-react';
import StatCard from './components/StatCard';
import ChatInterface from './components/ChatInterface';
import MapView from './components/MapView';
import DataCharts from './components/DataCharts';
import { MOCK_DATA } from './constants';

const App: React.FC = () => {
  const totalStations = MOCK_DATA.length;
  const totalPersonnel = MOCK_DATA.reduce((acc, curr) => acc + curr.jumlahKeanggotaan, 0);
  const totalFemale = MOCK_DATA.reduce((acc, curr) => acc + curr.wanita, 0);
  const avgPersonnel = (totalPersonnel / totalStations).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Banner / Status */}
      <div className="bg-slate-900 text-[10px] text-slate-400 py-1.5 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><Zap size={10} className="mr-1 text-yellow-500" /> SERVER STATUS: ONLINE</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center"><ShieldCheck size={10} className="mr-1 text-blue-500" /> SECURE DATA INTEGRATION (2025)</span>
        </div>
        <div className="font-mono">VER 1.0.343-SYNC</div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-2.5 rounded-xl shadow-lg shadow-red-200">
              <Flame className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">BombaInsight 2025</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Advanced Spatial Analytics</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-sm font-bold text-xs transition-all">
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg font-bold text-xs transition-all">
              <MapIcon size={14} />
              <span>Peta Spatial</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg font-bold text-xs transition-all">
              <FileSearch size={14} />
              <span>Laporan</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative">
        
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Status Operasi Balai Bomba</h2>
            <p className="text-slate-500 font-medium max-w-2xl mt-1">Penganalisisan komprehensif merangkumi seluruh <span className="text-slate-900 font-bold">{totalStations} balai bomba</span> berdaftar di Malaysia menggunakan data geospasial real-time.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400">+ 12 Ahli Pasukan</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Jumlah Balai Bomba" 
            value={totalStations} 
            icon={<Building2 size={24} />} 
            color="bg-blue-600" 
            subValue="Data sah CSV Integrasi"
          />
          <StatCard 
            title="Kekuatan Skuad" 
            value={totalPersonnel.toLocaleString()} 
            icon={<Users size={24} />} 
            color="bg-emerald-600" 
            subValue="Pegawai Aktif Operasi"
          />
          <StatCard 
            title="Anggota Wanita" 
            value={totalFemale.toLocaleString()} 
            icon={<TrendingUp size={24} />} 
            color="bg-pink-600" 
            subValue={`${((totalFemale/totalPersonnel)*100).toFixed(1)}% Representatif`}
          />
          <StatCard 
            title="Kapasiti Purata" 
            value={avgPersonnel} 
            icon={<Zap size={24} />} 
            color="bg-indigo-600" 
            subValue="Kekuatan per stesen"
          />
        </div>

        {/* Map Section - Now Full Width */}
        <div className="mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapIcon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-extrabold text-slate-800 tracking-tight uppercase text-sm">
                  Visualisasi Spatial Malaysia (Pangkalan Data Penuh 2025)
                </h3>
              </div>
              <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Live Tracker Active</span>
              </div>
            </div>
            <MapView />
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-10">
          <DataCharts />
        </div>

        {/* Data Table Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="font-black text-slate-900 text-lg tracking-tight">Indeks Balai Bomba Utama</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Paparan terperinci mengikut hierarki negeri dan daerah.</p>
            </div>
            <div className="flex items-center space-x-2">
               <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">Export CSV</button>
               <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all">Lihat 343 Balai</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100 bg-slate-50/20">
                  <th className="px-8 py-5">Negeri</th>
                  <th className="px-8 py-5">Nama Balai</th>
                  <th className="px-8 py-5 text-center">Latitud</th>
                  <th className="px-8 py-5 text-center">Longitud</th>
                  <th className="px-8 py-5 text-center">Kekuatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_DATA.slice(0, 8).map((station) => (
                  <tr key={station.id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-8 py-4">
                      <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded text-slate-600 uppercase tracking-tighter group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {station.negeri}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{station.nama}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{station.daerah}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-center font-mono text-xs text-slate-500">{station.lat.toFixed(6)}</td>
                    <td className="px-8 py-4 text-center font-mono text-xs text-slate-500">{station.lng.toFixed(6)}</td>
                    <td className="px-8 py-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-black text-blue-600 text-base">{station.jumlahKeanggotaan}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Anggota</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Chat Interface */}
        <ChatInterface />
        
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-slate-900 font-black text-sm uppercase tracking-tighter">Sistem Arkib JBPM 2025</span>
              </div>
              <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Hak Cipta Terpelihara &copy; BombaInsight Intelligence Unit</p>
            </div>
            <div className="flex space-x-8 font-black text-[10px] uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Data Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">API Docs</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support Portal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
