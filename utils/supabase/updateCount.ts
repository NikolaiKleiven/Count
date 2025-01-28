import { createClient } from "./client";

export async function getCount() {
  const supabase = createClient();

  const { data, error } = await supabase.from("counts").select("count");

  if (error) {
    console.error("Error fetching count:", error.message);
    return [];
  }

  return data;
}
