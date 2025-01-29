import { createClient } from "./client";

export async function getCount() {
  const supabase = createClient();

  let count = [];

  const { data, error } = await supabase
    .from("counts")
    .select("count")
    .eq("id", 1);
  const { data: data2, error: error2 } = await supabase
    .from("counts")
    .select("count")
    .eq("id", 2);

  count.push(data, data2);
  if (error) {
    console.error("Error fetching count:", error.message);
    return [];
  }
  console.log(count);
  return count;
}
