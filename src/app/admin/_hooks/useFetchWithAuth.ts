"use client";

import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const useFetchWithAuth = <T,>(url: string) => {
  const { token } = useSupabaseSession();

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!res.ok) throw new Error("API Error");
    return res.json();
  };

  const shouldFetch = token && url;

  const { data, error, isLoading } = useSWR<T>(shouldFetch ? url : null, fetcher);

  return { data, error, isLoading };
};

export default useFetchWithAuth;
