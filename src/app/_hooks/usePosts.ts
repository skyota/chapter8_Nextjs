import useFetch from "@/app/_hooks/useFetch";
import { Post } from '@/app/_types/Post';

const usePosts = () => useFetch<{ posts: Post[] }>("/api/posts");

export default usePosts;
