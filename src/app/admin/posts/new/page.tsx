"use client"

import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useCategories from '../../_hooks/useCategories';
import { api } from "@/app/_utils/api";
import PostForm from "../_components/PostForm/index";
import { CreatePostRequestBody } from "../../../api/admin/posts/route";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const PostCreate: React.FC = () => {
  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useCategories();
  const router = useRouter();
  const { token } = useSupabaseSession();

  if (categoryLoading) return <p>読み込み中...</p>;
  if (categoryError) return <p>読み込みエラー</p>;
  if (!categoryData) return <p>カテゴリーが見つかりません</p>;

  const categories = categoryData.categories;

  const onSubmit: SubmitHandler<CreatePostRequestBody> = async (data) => {
    const payload = {
      title: data.title,
      content: data.content,
      thumbnailUrl: data.thumbnailUrl,
      categories: Array.isArray(data.categoryIds)
        ? data.categoryIds.map((id) => ({ id: Number(id) }))
        : data.categoryIds
        ? [{ id: Number(data.categoryIds) }]
        : []
    };

    try {
      const res = await api.post<CreatePostRequestBody>("/api/admin/posts", payload, token);
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
