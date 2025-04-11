import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_APIKEY as string,
    }
  });
  if (!res.ok) throw new Error("API Error");
  return res.json();
};

const useFetch = <T,>(url: string) => useSWR<T>(url, fetcher);

export default useFetch;
