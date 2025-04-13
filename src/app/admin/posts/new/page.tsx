"use client"

import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useFetch from '@/app/_hooks/useFetch';
import { api } from "@/app/_utils/api";
import { Category } from "@/app/_types/Post";
import PostForm from "../_components/PostForm/index";
import { PostRequestBody } from "@/types/requestBody";

type CreateForm = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categoryIds: number[];
}

const PostCreate: React.FC = () => {
  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useFetch<{ categories: Category[] }>("/api/admin/categories");
  const router = useRouter();

  if (categoryLoading) return <p>読み込み中...</p>;
  if (categoryError) return <p>読み込みエラー</p>;
  if (!categoryData) return <p>カテゴリーが見つかりません</p>;

  const categories = categoryData.categories;

  const onSubmit: SubmitHandler<CreateForm> = async (data: PostRequestBody) => {
    const payload = {
      title: data.title,
      content: data.content,
      thumbnailUrl: data.thumbnailUrl,
      categories: (data.categoryIds || []).map((id) => ({ id: Number(id) }))
    };

    try {
      const res = await api.post("/api/admin/posts", payload);
      if (!res.ok) throw new Error("Network response was not ok");
      alert("記事を作成しました");
      router.push("/admin/posts");
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  return <PostForm categories={categories} onSubmit={onSubmit} />
}

export default PostCreate;
