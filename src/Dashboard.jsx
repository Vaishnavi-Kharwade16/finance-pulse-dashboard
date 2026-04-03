import React, { useContext, useState } from 'react';
import { DashboardContext } from './DashboardContext';
import { 
  Wallet, ArrowUpCircle, ArrowDownCircle, Search, Plus, X, 
  TrendingUp, BarChart3, PieChart as PieIcon 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';

const Dashboard = () => {
  const { 
    transactions, 
    role, 
    setRole, 
    stats, 
    setSearch, 
    addTransaction, 
    topExpenseCategory 
  } = useContext(DashboardContext);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    amount: '', category: '', type: 'expense', 
    date: new Date().toISOString().split('T')[0] 
  });

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;
    addTransaction({ ...formData, amount: parseFloat(formData.amount) });
    setShowForm(false);
    setFormData({ amount: '', category: '', type: 'expense', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Finance Pulse</h1>
          <p className="text-slate-500 text-sm">Welcome back, <span className="font-semibold text-blue-600">{role}</span></p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
          <Search size={18} className="text-slate-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search category..." 
            className="outline-none text-sm w-40 md:w-60"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-100 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl cursor-pointer"
          >
            <option value="Admin">Admin</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </header>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Balance" value={stats.balance} icon={<Wallet className="text-blue-600" />} color="text-blue-600" />
        <StatCard title="Income" value={stats.totalIncome} icon={<ArrowUpCircle className="text-green-600" />} color="text-green-600" />
        <StatCard title="Expenses" value={stats.totalExpenses} icon={<ArrowDownCircle className="text-red-600" />} color="text-red-600" />
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-indigo-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Top Category</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 truncate">{topExpenseCategory}</h3>
        </div>
      </div>

      {/* VISUALIZATIONS (Requirement 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Time-based Trend */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-80">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
            <BarChart3 size={16} /> Balance Trend
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={transactions}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="amount" stroke="#4F46E5" strokeWidth={4} dot={{ r: 6, fill: '#4F46E5' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Categorical Breakdown */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-80">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
            <PieIcon size={16} /> Spending Breakdown
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={transactions.filter(t => t.type === 'expense')} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                {transactions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ADMIN ACTION (Requirement 3) */}
      {role === 'Admin' && (
        <div className="mb-8">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-slate-200">
              <Plus size={20} /> New Transaction
            </button>
          ) : (
            <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-blue-50 relative animate-in fade-in zoom-in duration-300">
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600"><X size={24} /></button>
              <h2 className="text-xl font-bold mb-6">Add Transaction</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input required type="text" placeholder="Category" className="bg-slate-50 p-4 rounded-2xl outline-blue-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                <input required type="number" placeholder="Amount" className="bg-slate-50 p-4 rounded-2xl outline-blue-500" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                <select className="bg-slate-50 p-4 rounded-2xl outline-blue-500 font-semibold" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">Save Details</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TABLE (Requirement 2) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t) => (
              <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{t.category}</p>
                  <p className="text-xs text-slate-400">{t.date}</p>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-lg ${t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {t.type}
                  </span>
                </td>
                <td className={`px-8 py-5 text-right font-bold text-lg ${t.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                  {t.type === 'expense' ? '-' : '+'}${t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && <div className="p-20 text-center text-slate-300 font-medium">No records found.</div>}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
    <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className={`text-2xl font-black ${color}`}>${value.toLocaleString()}</h3>
    </div>
  </div>
);

export default Dashboard;