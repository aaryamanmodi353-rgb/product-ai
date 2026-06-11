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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          E-Commerce Price Predictor
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Nike Air Max 90"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Item Description</label>
            <textarea
              required
              rows="4"
              placeholder="Provide a detailed item description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={formData.item_description}
              onChange={(e) => setFormData({...formData, item_description: e.target.value})}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md"
          >
            {loading ? 'Evaluating Parameters...' : 'Calculate Target Price'}
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm uppercase tracking-wider font-semibold text-gray-500">Predicted Optimal Value</p>
            <p className="text-4xl font-extrabold text-green-600 mt-1">${prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
