import supabase from "./supabase-client";

// Generic function to get all data from a table
export const getData = async (tableName) => {
  const { data, error } = await supabase.from(tableName).select("*");
  return { data, error };
};
