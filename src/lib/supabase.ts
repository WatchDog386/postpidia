import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Subscription = {
  id?: string;
  email: string;
  plan: string;
  billing: string;
  amount: number;
  reference: string;
  status: string;
  paid_at: string;
  created_at?: string;
};
