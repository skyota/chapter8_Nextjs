import useFetch from "@/app/_hooks/useFetch";
import { Post } from '@/app/_types/Post';

const usePosts = () => useFetch<{ posts: Post[] }>("/api/admin/posts");

export default usePosts;
