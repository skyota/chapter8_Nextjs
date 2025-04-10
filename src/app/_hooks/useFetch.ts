import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useFetch = <T,>(url: string) => useSWR<T>(url, fetcher);

export default useFetch;
