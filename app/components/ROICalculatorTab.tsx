// app/components/ROICalculatorTab.tsx
"use client";

import React, { useState } from 'react'; // Removed useEffect as it's no longer needed for derived state

const ROICalculatorTab = () => {
  const [emergencyCalls, setEmergencyCalls] = useState(50);
  const [dispatchTime, setDispatchTime] = useState(15);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webhookUrl = 'https://n8n-production-4ccd.up.railway.app/webhook/agency-demo';

  // Derived state for HVAC KPIs
  const bookedJobsRate = 68.4; // Static for demo
  const technicianUtilization = 91.2; // Static for demo

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
          emergencyCalls,
          dispatchTime,
          bookedJobsRate,
          technicianUtilization,
          action: 'real_estate_automation_demo',
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
      } else {
        setError('Failed to start live demo. Please try again.');
      }
    } catch (err: unknown) {
      setError('An error occurred while starting the live demo.');
      console.error('Error starting live demo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Real Estate Automation & Efficiency Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Monthly Emergency Calls Input */}
        <div>
          <label htmlFor="emergencyCalls" className="block text-lg font-medium mb-2">
            Monthly Property Inquiries: <span className="text-blue-400">{emergencyCalls}</span>
          </label>
          <input
            type="range"
            id="emergencyCalls"
            min="10"
            max="500"
            step="10"
            value={emergencyCalls}
            onChange={(e) => setEmergencyCalls(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Average Dispatch Time Input */}
        <div>
          <label htmlFor="dispatchTime" className="block text-lg font-medium mb-2">
            Average Response Time (mins): <span className="text-blue-400">{dispatchTime} mins</span>
          </label>
          <input
            type="range"
            id="dispatchTime"
            min="5"
            max="60"
            step="1"
            value={dispatchTime}
            onChange={(e) => setDispatchTime(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      {/* Live Results */}
      <div className="bg-gray-700 p-4 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Projected Performance Boost</h3>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-gray-400">Booked Viewings Rate:</p>
            <p className="text-3xl font-bold text-green-400">{bookedJobsRate}%</p>
          </div>
          <div>
            <p className="text-gray-400">Agent Utilization:</p>
            <p className="text-3xl font-bold text-purple-400">{technicianUtilization}%</p>
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