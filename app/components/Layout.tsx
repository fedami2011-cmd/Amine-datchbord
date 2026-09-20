// app/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;