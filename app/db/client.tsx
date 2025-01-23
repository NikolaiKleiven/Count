import { createClient } from "@/utils/supabase/server";
import { Database } from "../../database.types";

export async function signOut() {
  const supabase = await createClient();
  let { error } = await supabase.auth.signOut();
}
