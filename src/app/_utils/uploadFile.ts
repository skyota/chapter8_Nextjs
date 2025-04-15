import { supabase } from "@/app/_utils/supabase";

export const uploadFile = async (
  file: File,
  bucketName: string,
  path: string
) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, error };
};