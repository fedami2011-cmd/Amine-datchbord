// app/components/ClientPerformanceDashboard.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSupabase } from '../lib/SupabaseProvider';

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string; // Assuming 'source' is the field for traffic source
}

const ClientPerformanceDashboard = () => {
  const { supabase } = useSupabase();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState('All'); // State for filtering by source

  // Dummy traffic source stats for demonstration
  const trafficStats = [
    { name: 'Google Ads', leads: 120 },
    { name: 'Facebook Ads', leads: 80 },
    { name: 'Website Form', leads: 45 },
  ];

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      if (!supabase) {
        setError("Supabase client not initialized.");
        setLoading(false);
        return;
      }

      try {
        let query = supabase
          .from('leads')
          .select('id, name, email, source') // Ensure 'source' column exists in your Supabase 'leads' table
          .order('created_at', { ascending: false });

        if (filterSource !== 'All') {
          query = query.eq('source', filterSource);
        }

        const { data, error } = await query;

        if (error) {
          setError(error.message);
          setLeads([]);
        } else {
          setLeads(data || []);
        }
      } catch (err: unknown) { // Changed 'any' to 'unknown'
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [supabase, filterSource]); // Re-fetch when supabase client or filterSource changes

  const dummyLeads: Lead[] = [
    { id: 'dummy1', name: 'Ahmed Ali', email: 'ahmed.ali@example.com', source: 'Google Ads' },
    { id: 'dummy2', name: 'Fatima Zahra', email: 'fatima.z@example.com', source: 'Facebook Ads' },
    { id: 'dummy3', name: 'Khalid Mahmoud', email: 'khalid.m@example.com', source: 'Website Form' },
  ];

  // Removed 'displayedLeads' as it was unused.
  // The conditional rendering will now directly use 'leads' or 'dummyLeads'.

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Client Performance Dashboard</h2>

      {/* Traffic Source Statistics */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Traffic Source Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trafficStats.map((stat, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
              <p className="text-gray-400">{stat.name}</p>
              <p className="text-3xl font-bold text-blue-400">{stat.leads}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Prospective Clients (Leads)</h3>
          <select
            className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
          >
            <option value="All">All Sources</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Website Form">Website Form</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading prospective clients...</p>
          </div>
        ) : error && leads.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Real-time data unavailable. Displaying sample data.</p>
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {dummyLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {lead.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Source
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {lead.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientPerformanceDashboard;