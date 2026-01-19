import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase credentials missing! Ensure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are in your .env file and RESTART your dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);