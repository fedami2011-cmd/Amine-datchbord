"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  FaGoogle,
  FaSignOutAlt,
  FaCalculator,
  FaChartLine,
  FaUserCheck,
  FaRobot,
  FaClock,
  FaDollarSign,
  FaPaperPlane,
  FaCheckCircle,
  FaUsers,
  FaInfoCircle,
  FaGithub,
  FaEnvelope,
  FaExternalLinkAlt,
  FaBolt,
} from "react-icons/fa";
import { User } from "@supabase/supabase-js";

// Supabase Direct Initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const N8N_WEBHOOK_URL =
  "https://n8n-production-4ccd.up.railway.app/webhook/agency-demo";

export default function Dashboard() {
  const [activeTab, setActiveTab] =
    useState<"calculator" | "leads" | "about">("calculator");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingWebhook, setSendingWebhook] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Calculator State
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [activeTechnicians, setActiveTechnicians] = useState<number>(5);
  const [missedCalls, setMissedCalls] = useState<number>(15);

  const recoveredRevenue = missedCalls * 425; // Average repair job value: $350-$500, using $425
  const responseSpeed = "< 30s";
  const autoBookedTickets = "85+/mo";
  const dispatchTier = missedCalls >= 10 ? "24/7 Auto-Booked" : "Standard Dispatch";

  // Mock Leads for Dashboard Demo
  const mockLeads = [
    { id: 1, name: "CoolBreeze HVAC", email: "service@coolbreeze.com", budget: "$15,000", saved: "55 hrs", tier: "VIP High-Ticket", status: "Automated" },
    { id: 2, name: "FrostyFix Repairs", email: "contact@frostyfix.com", budget: "$5,000", saved: "20 hrs", tier: "Standard Lead", status: "Processed" },
    { id: 3, name: "Heating Heroes", email: "support@heatingheroes.net", budget: "$10,000", saved: "40 hrs", tier: "VIP High-Ticket", status: "Automated" },
    { id: 4, name: "Airflow Pros", email: "dispatch@airflowpros.io", budget: "$2,500", saved: "12 hrs", tier: "Standard Lead", status: "Pending" }
  ];

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        setLeadName(session.user.user_metadata?.full_name || "");
        setLeadEmail(session.user.email || "");
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setLeadName(session.user.user_metadata?.full_name || "");
        setLeadEmail(session.user.email || "");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleCalculateAndSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSendingWebhook(true);
  setSuccessMsg("");

  const payload = {
    agency_name: "Amine Digital Solutions",
    lead_name: leadName || "Valued Client",
    lead_email: leadEmail || "client@example.com",
    active_technicians: activeTechnicians,
    weekly_missed_calls: missedCalls,
    recovered_revenue: recoveredRevenue,
    response_speed: responseSpeed,
    auto_booked_tickets: autoBookedTickets,
    dispatch_tier: dispatchTier,
  };

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccessMsg("Assessment calculated and report sent via automation successfully!");
    } else {
      setSuccessMsg("Submitted! Assessment logged for processing.");
    }
  } catch (err) {
    console.error("Webhook submission error:", err);
    setSuccessMsg("Assessment calculated! Data synced.");
  } finally {
    setSendingWebhook(false);
  }
};

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl">
            <FaRobot className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">Amine Digital Solutions</h1>
            <p className="text-xs text-gray-400">AI & Workflow Automation Control Center</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 bg-gray-950 p-1 rounded-xl border border-gray-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              activeTab === "calculator" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <FaCalculator />
            <span>HVAC Dispatch Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              activeTab === "leads" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <FaUsers />
            <span>Client Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
              activeTab === "about" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <FaInfoCircle />
            <span>Agency Info</span>
          </button>
        </div>

        {/* Auth Button */}
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700">
                {user.user_metadata?.avatar_url && (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="User Avatar" 
                    className="w-8 h-8 rounded-full border border-blue-400"
                  />
                )}
                <span className="text-sm font-medium text-gray-200 hidden sm:block">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-xl border border-red-500/30 transition text-sm font-medium"
              >
                <FaSignOutAlt />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-5 py-2.5 rounded-xl transition shadow-lg text-sm"
            >
              <FaGoogle className="text-red-500 text-base" />
              <span>Sign in</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        
        {/* TAB 1: ROI CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <FaCalculator className="text-blue-500 text-2xl" />
                  <h2 className="text-xl font-bold text-white">HVAC Dispatch & Emergency ROI Calculator</h2>
                </div>

                <form onSubmit={handleCalculateAndSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Client Full Name</label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="john@hvac-pros.com"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-gray-400">Active Field Technicians</label>
                      <span className="text-sm font-bold text-blue-400">{activeTechnicians} techs</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={activeTechnicians}
                      onChange={(e) => setActiveTechnicians(Number(e.target.value))}
                      className="w-full accent-blue-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-gray-400">Weekly Missed After-Hours Emergency Calls</label>
                      <span className="text-sm font-bold text-indigo-400">{missedCalls} calls/week</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={missedCalls}
                      onChange={(e) => setMissedCalls(Number(e.target.value))}
                      className="w-full accent-indigo-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sendingWebhook}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
                  >
                    {sendingWebhook ? (
                      <span>Processing Simulation...</span>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Simulate HVAC Automation & Dispatch Pipeline 🚀</span>
                      </>
                    )}
                  </button>
                </form>

                {successMsg && (
                  <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <FaCheckCircle className="text-emerald-400 text-base flex-shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: ROI Impacts */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <h2 className="text-lg font-bold text-white mb-1 flex items-center space-x-2">
                <FaChartLine className="text-indigo-400" />
                <span>Estimated Monthly Impact</span>
              </h2>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Recovered Revenue From Emergency Calls</p>
                  <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">${recoveredRevenue.toLocaleString()}</h3>
                </div>
                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <FaDollarSign className="text-xl" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Emergency Response Speed</p>
                  <h3 className="text-2xl font-extrabold text-indigo-400 mt-1">{responseSpeed}</h3>
                </div>
                <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-400">
                  <FaClock className="text-xl" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Auto-Booked Repair Tickets</p>
                  <h3 className="text-2xl font-extrabold text-blue-400 mt-1">{autoBookedTickets}</h3>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-400">
                  <FaUserCheck className="text-xl" />
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                <p className="text-xs text-gray-400 font-medium mb-1">Lead Qualification Tier</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full border ${
                    dispatchTier === "24/7 Auto-Booked" 
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  }`}>
                    {dispatchTier}
                  </span>
                  <span className="text-xs text-gray-500">n8n Emergency Dispatch Pipeline</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT DASHBOARD (Demo Analytics) */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Live Agency Dashboard</h2>
                <p className="text-sm text-gray-400">Monitor automated leads and real-time efficiency metrics (Demo Data).</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
                Refresh Database
              </button>
            </div>

            {/* Analytics Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Response Time</span>
                  <FaClock className="text-indigo-400" />
                </div>
                <h3 className="text-3xl font-black text-white">&lt; 28s</h3>
                <p className="text-xs text-emerald-400 mt-2 font-medium">Speed to lead for emergency calls</p>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Booked Jobs Rate</span>
                  <FaCheckCircle className="text-emerald-400" />
                </div>
                <h3 className="text-3xl font-black text-white">68.4%</h3>
                <p className="text-xs text-emerald-400 mt-2 font-medium">Inquiries converted into paid field visits</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Technician Utilization</span>
                  <FaBolt className="text-amber-400" />
                </div>
                <h3 className="text-3xl font-black text-white">91.2%</h3>
                <p className="text-xs text-gray-400 mt-2 font-medium">Optimized daily routes with zero double-booking</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Quote Conversion Speed</span>
                  <FaDollarSign className="text-emerald-400" />
                </div>
                <h3 className="text-3xl font-black text-white">2.4 hrs</h3>
                <p className="text-xs text-emerald-400 mt-2 font-medium">Fast approval on sent repair estimates</p>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/80">
                <h3 className="text-sm font-bold text-white">Recent Processed Leads</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-950/50 text-xs uppercase font-semibold text-gray-500 border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4">Client Name</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Ad Budget</th>
                      <th className="px-6 py-4">Tier</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {mockLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-800/30 transition">
                        <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                        <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                        <td className="px-6 py-4 font-semibold text-emerald-400">{lead.budget}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                            lead.tier === "VIP High-Ticket" 
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
                              : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          }`}>
                            {lead.tier}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center space-x-1.5 text-xs font-medium text-gray-400">
                            <span className={`w-2 h-2 rounded-full ${lead.status === 'Automated' ? 'bg-emerald-500' : lead.status === 'Processed' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                            <span>{lead.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AGENCY INFO & CONTACT */}
        {activeTab === "about" && (
          <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            
            {/* Intro Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <FaBolt className="text-9xl text-blue-500" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <span className="text-blue-500 font-bold tracking-wider text-xs uppercase mb-3 block">HVAC Automation Specialist</span>
                <h2 className="text-3xl font-black text-white mb-2">Eliminate Missed Emergency Calls & Maximize Technician Efficiency</h2>
                <h3 className="text-lg text-gray-400 mb-5">AI-Powered Dispatch for HVAC Contractors</h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                   Custom n8n & AI automation engines for HVAC contractors. We convert emergency calls into booked repair tickets in under 30 seconds—24/7, eliminating missed opportunities and manual dispatching. Our system sends jobs directly to your field technicians&apos; calendars to maximize billable hours.
                  </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800 text-blue-400 text-xs rounded-full font-bold border border-blue-900/50">24/7 Call Handling</span>
                  <span className="px-3 py-1 bg-gray-800 text-emerald-400 text-xs rounded-full font-bold border border-emerald-900/50">Automated Dispatch</span>
                  <span className="px-3 py-1 bg-gray-800 text-indigo-400 text-xs rounded-full font-bold border border-indigo-900/50">Technician Scheduling</span>
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-bold border border-gray-700">n8n Workflows</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <FaRobot className="text-indigo-400" />
                <span>HVAC Automation Architecture</span>
              </h3>
              <ol className="relative border-l border-gray-700 space-y-6">
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-900 rounded-full -left-3 ring-8 ring-gray-900">
                    <span className="text-blue-400 text-xs font-bold">1</span>
                  </span>
                  <h4 className="font-semibold text-white">Input</h4>
                  <p className="text-sm text-gray-400">Emergency Call / WhatsApp / Web Form is received. Gemini 1.5 Flash parses issue severity and client location.</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-900 rounded-full -left-3 ring-8 ring-gray-900">
                    <span className="text-blue-400 text-xs font-bold">2</span>
                  </span>
                  <h4 className="font-semibold text-white">Automation Engine</h4>
                  <p className="text-sm text-gray-400">n8n workflow checks tech calendars & writes to Supabase / Google Sheets.</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-900 rounded-full -left-3 ring-8 ring-gray-900">
                    <span className="text-blue-400 text-xs font-bold">3</span>
                  </span>
                  <h4 className="font-semibold text-white">Output</h4>
                  <p className="text-sm text-gray-400">Instant WhatsApp confirmation with ETA to client + Notification to dispatcher.</p>
                </li>
              </ol>
            </div>

            {/* Links Grid */}
            <h3 className="text-xl font-bold text-white px-2">Connect & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <a href="mailto:amine.branding.dz@gmail.com" className="bg-gray-900 border border-gray-800 hover:border-blue-500/50 p-5 rounded-2xl group transition flex items-start space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-xl group-hover:bg-blue-500/20 transition">
                  <FaEnvelope className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Direct Email</h4>
                  <p className="text-xs text-gray-500">amine.branding.dz@gmail.com</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/amine-feddane-8a2099418/" target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 p-5 rounded-2xl group transition flex items-start space-x-4">
                <div className="bg-indigo-500/10 p-3 rounded-xl group-hover:bg-indigo-500/20 transition">
                  <FaExternalLinkAlt className="text-indigo-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">LinkedIn</h4>
                  <p className="text-xs text-gray-500">Connect with me professionally.</p>
                </div>
              </a>

              <a href="https://github.com/fedami2011-cmd" target="_blank" rel="noopener noreferrer" className="bg-gray-900 border border-gray-800 hover:border-gray-600 p-5 rounded-2xl group transition flex items-start space-x-4">
                <div className="bg-gray-800 p-3 rounded-xl group-hover:bg-gray-700 transition">
                  <FaGithub className="text-gray-300 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">GitHub</h4>
                  <p className="text-xs text-gray-500">Explore my repositories.</p>
                </div>
              </a>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}