import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useFetch = <T,>(url: string) => {
  const { data, error, isLoading } = useSWR<T>(url, fetcher);
  return { data, error, isLoading };
};

export default useFetch;
