import useFetchWithAuth from "./useFetchWithAuth";
import { Post } from '@/app/_types/Post';

const usePost = (id: string) => useFetchWithAuth<Post>(`/api/admin/posts/${id}`);

export default usePost;
