// app/components/ROICalculatorTab.tsx
"use client";

import React, { useState } from 'react'; // Removed useEffect as it's no longer needed for derived state

const ROICalculatorTab = () => {
  const [adBudget, setAdBudget] = useState(5000);
  const [hoursSpent, setHoursSpent] = useState(10);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webhookUrl = 'https://n8n-production-4ccd.up.railway.app/webhook/agency-demo';

  // Derived state - calculated directly
  const projectedROI = adBudget * 4; // ROI Calculation: Estimated ROI = Ad Spend * 4
  const hoursSaved = hoursSpent * 4; // Time Saved Calculation: Assuming 4 weeks per month

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          adBudget,
          hoursSpent,
          projectedROI,
          hoursSaved,
          action: 'roi_automation_demo',
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
      } else {
        setError('Failed to start live demo. Please try again.');
      }
    } catch (err: unknown) { // Changed 'any' to 'unknown'
      setError('An error occurred while starting the live demo.');
      console.error('Error starting live demo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">ROI & Time Savings Calculator + Automation Demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monthly Ad Spend Input */}
        <div>
          <label htmlFor="adBudget" className="block text-lg font-medium mb-2">
            Monthly Ad Budget ($): <span className="text-blue-400">${adBudget}</span>
          </label>
          <input
            type="range"
            id="adBudget"
            min="1000"
            max="50000"
            step="500"
            value={adBudget}
            onChange={(e) => setAdBudget(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Weekly Manual Hours Input */}
        <div>
          <label htmlFor="hoursSpent" className="block text-lg font-medium mb-2">
            Weekly Manual Hours Spent: <span className="text-blue-400">{hoursSpent} hours</span>
          </label>
          <input
            type="range"
            id="hoursSpent"
            min="1"
            max="40"
            step="1"
            value={hoursSpent}
            onChange={(e) => setHoursSpent(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      {/* Live Results */}
      <div className="bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Estimated Performance</h3>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-gray-400">Projected ROI:</p>
            <p className="text-3xl font-bold text-green-400">${projectedROI.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">Hours Saved / Month:</p>
            <p className="text-3xl font-bold text-purple-400">{hoursSaved} hours</p>
          </div>
        </div>
      </div>

      {/* Automation Demo Form */}
      <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Test Live Automation</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 rounded-md bg-gray-600 border border-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-md bg-gray-600 border border-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Run Automation Demo'}
        </button>

        {success && (
          <p className="mt-4 text-green-400 text-center">
            Success! Check your inbox for the instant automation report.
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-400 text-center">
            Error: {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default ROICalculatorTab;