import useFetchWithAuth from "./useFetchWithAuth";
import { Category } from '@/app/_types/Post';

const useCategory = (id: string) => useFetchWithAuth<Category>(`/api/admin/categories/${id}`);

export default useCategory;
