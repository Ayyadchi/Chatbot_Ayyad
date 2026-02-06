
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MOCK_DATA } from '../constants';

const DataCharts: React.FC = () => {
  // Aggregate data by state
  const stateDataRaw = MOCK_DATA.reduce((acc: any, curr) => {
    acc[curr.negeri] = (acc[curr.negeri] || 0) + curr.jumlahKeanggotaan;
    return acc;
  }, {});

  const stateChartData = Object.keys(stateDataRaw).map(state => ({
    name: state,
    value: stateDataRaw[state]
  })).sort((a, b) => b.value - a.value);

  const totalMale = MOCK_DATA.reduce((sum, item) => sum + item.lelaki, 0);
  const totalFemale = MOCK_DATA.reduce((sum, item) => sum + item.wanita, 0);

  const genderData = [
    { name: 'Lelaki', value: totalMale, color: '#3b82f6' },
    { name: 'Wanita', value: totalFemale, color: '#f472b6' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-tight flex items-center">
          <span className="w-1 h-4 bg-blue-600 mr-2 rounded-full"></span>
          Kapasiti Keanggotaan Mengikut Wilayah
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateChartData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 500, fill: '#64748b' }} 
                width={100}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-tight flex items-center">
          <span className="w-1 h-4 bg-pink-500 mr-2 rounded-full"></span>
          Demografi Jantina (Keseimbangan)
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-3xl font-extrabold text-slate-900">{totalMale + totalFemale}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Total Skuad</p>
          </div>
          
          <div className="w-full mt-4 space-y-3">
            {genderData.map(item => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-bold text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-600">
                      {item.value} ({((item.value / (totalMale + totalFemale)) * 100).toFixed(1)}%)
                    </span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCharts;
