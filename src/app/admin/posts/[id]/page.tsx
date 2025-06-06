"use client"

import useCategories from '../../_hooks/useCategories';
import usePost from '../../_hooks/usePost';
import { useParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "@/app/_utils/api";
import PostForm from "../_components/PostForm";
import { UpdatePostRequestBody } from "../../../api/admin/posts/[id]/route";

const PostUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useCategories();
  const { data: postData, error: postError, isLoading: postLoading } = usePost(id);

  if (categoryLoading || postLoading) return <p>読み込み中...</p>;
  if (categoryError || postError) return <p>読み込みエラー</p>;
  if (!postData) return <p>記事が見つかりません</p>;
  if (!categoryData) return <p>カテゴリーが見つかりません</p>;

  const post = postData.post;
  const categories = categoryData.categories;

  const onSubmit: SubmitHandler<UpdatePostRequestBody> = async (formData) => {
    try {
      const res = await api.put<UpdatePostRequestBody>(`/api/admin/posts/${id}`, {
        title: formData.title,
        content: formData.content,
        thumbnailUrl: formData.thumbnailUrl,
        categories: formData.categoryIds.map((id) => ({id: Number(id)}))
      })
      if (!res.ok) throw new Error("Network response was not ok");
      alert("更新しました")
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/admin/posts/${id}`);
      if (!res.ok) throw new Error("削除に失敗しました");
      alert("記事を削除しました");
      // 削除後は一覧ページに遷移
      router.push("/admin/posts")
    } catch (error) {
      console.log("削除中にエラーが発生しました", error);
      alert("削除に失敗しました");
    }
  };

  return <PostForm isEdit={true} categories={categories} post={post} onSubmit={onSubmit} handleDelete={handleDelete} />;
}

export default PostUpdate;
