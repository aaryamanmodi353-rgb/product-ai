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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-8 border border-white/20 relative z-10 transition-all duration-500 hover:bg-white/15">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100 mb-6 text-center drop-shadow-sm">
          E-Commerce Price Predictor
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-1.5 tracking-wide">Product Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Nike Air Max 90"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-200/50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-300"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-1.5 tracking-wide">Item Description</label>
            <textarea
              required
              rows="4"
              placeholder="Provide a detailed item description..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-indigo-200/50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-300 resize-none"
              value={formData.item_description}
              onChange={(e) => setFormData({...formData, item_description: e.target.value})}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Evaluating Parameters...' : 'Calculate Target Price'}
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-8 pt-6 border-t border-white/10 text-center transition-all duration-500">
            <p className="text-sm uppercase tracking-widest font-medium text-indigo-200 mb-2">Predicted Optimal Value</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 drop-shadow-md">
              ${prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
