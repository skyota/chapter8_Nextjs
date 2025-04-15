import { supabase } from "@/app/_utils/supabase";
import { NextRequest } from "next/server";

export const getUser = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  return { data, error };
};
