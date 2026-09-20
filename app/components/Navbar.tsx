// app/components/Navbar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../lib/SupabaseProvider';

const Navbar = () => {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
        alert('Error logging out. Please try again.');
      } else {
        router.push('/auth');
      }
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Amine Digital Solutions Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-4">Welcome, User!</span>
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;