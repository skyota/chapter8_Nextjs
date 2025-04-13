import useFetchWithAuth from "./useFetchWithAuth";
import { Post } from '@/app/_types/Post';

const usePosts = () => useFetchWithAuth<{ posts: Post[] }>("/api/admin/posts");

export default usePosts;
