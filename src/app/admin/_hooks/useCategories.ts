import { Category } from '@/app/_types/Post';
import useFetchWithAuth from "./useFetchWithAuth";

const useCategories = () => useFetchWithAuth<{ categories: Category[] }>("/api/admin/categories");

export default useCategories;
