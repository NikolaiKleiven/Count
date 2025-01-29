// import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// export function createClient() {
//   return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// }

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}
