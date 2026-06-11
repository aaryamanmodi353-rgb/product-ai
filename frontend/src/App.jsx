import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    item_description: '',
    item_condition_id: 1,
    shipping: 0
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          item_condition_id: parseInt(formData.item_condition_id),
          shipping: parseInt(formData.shipping)
        })
      });
      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] left-[60%] w-72 h-72 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-xl w-full bg-slate-900/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-2xl p-8 border border-white/10 relative z-10 transition-all duration-500 hover:bg-slate-900/50">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 text-center tracking-tight">
          E-Commerce Price Predictor
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Product Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Nike Air Max 90"
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all duration-300 shadow-inner"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Item Description</label>
            <textarea
              required
              rows="4"
              placeholder="Provide a detailed item description..."
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all duration-300 resize-none shadow-inner"
              value={formData.item_description}
              onChange={(e) => setFormData({...formData, item_description: e.target.value})}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Evaluating Parameters...' : 'Calculate Target Price'}
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center transition-all duration-500">
            <p className="text-sm uppercase tracking-widest font-semibold text-slate-400 mb-3">Predicted Optimal Value</p>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm">
              ${prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
