import useFetch from "@/app/_hooks/useFetch";
import { Post } from '@/app/_types/Post';

const useAdminPost = (id: string) => useFetch<Post>(`/api/admin/posts/${id}`);

export default useAdminPost;
