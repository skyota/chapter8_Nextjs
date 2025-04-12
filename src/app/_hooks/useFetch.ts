import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API Error");
  return res.json();
};

const useFetch = <T,>(url: string) => useSWR<T>(url, fetcher);

export default useFetch;
