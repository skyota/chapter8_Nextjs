import useFetch from "@/app/_hooks/useFetch";
import { Post } from '@/app/_types/Post';

const useAdminPosts = () => useFetch<{ posts: Post[] }>("/api/admin/posts");

export default useAdminPosts;
