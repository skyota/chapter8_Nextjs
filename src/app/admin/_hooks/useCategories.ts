import useFetch from "@/app/_hooks/useFetch";
import { Category } from '@/app/_types/Post';

const useCategories = () => useFetch<{ categories: Category[] }>("/api/admin/categories");

export default useCategories;
