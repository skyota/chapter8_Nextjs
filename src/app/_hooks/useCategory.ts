import useFetch from "@/app/_hooks/useFetch";
import { Category } from '@/app/_types/Post';

const useCategory = (id: string) => useFetch<Category>(`/api/admin/categories/${id}`);

export default useCategory;
