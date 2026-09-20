"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface SupabaseContextType {
  supabase: SupabaseClient | null;
}

const SupabaseContext = createContext<SupabaseContextType>({ supabase: null });

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables");
      return;
    }

    const client = createClient(supabaseUrl, supabaseAnonKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupabase(client); // This is part of initialization, so it's safe to set state here
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};