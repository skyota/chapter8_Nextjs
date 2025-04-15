import { supabase } from "@/app/_utils/supabase";

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
};

export const api ={
  get: async (url: string) => {
    const token = await getToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
    });
  },

  post: async <T>(url: string, body: T) => {
    const token = await getToken();
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });
  },
  
  put: async <T>(url: string, body: T) => {
    const token = await getToken();
    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });
  },

  delete: async (url: string) => {
    const token = await getToken();
    return await fetch(url, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
    });
  },
};
