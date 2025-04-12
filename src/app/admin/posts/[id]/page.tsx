"use client"

import { Category, Post } from "@/app/_types/Post";
import useFetch from '@/app/_hooks/useFetch';
import { useParams } from "next/navigation";
import Label from "../../_components/Label";
import TextInput from "../../_components/TextInput";
import Textarea from "../../_components/Textarea";
import Checkbox from "../../_components/Checkbox";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type UpdateForm = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categoryIds: number[];
}

const PostUpdate: React.FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<UpdateForm>();
  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useFetch<{ categories: Category[] }>("/api/admin/categories");

  const { id } = useParams<{ id: string }>();
  const { data: postData, error: postError, isLoading: postLoading } = useFetch<Post>(`/api/admin/posts/${id}`);
  const router = useRouter();

  if (categoryLoading || postLoading) return <p>読み込み中...</p>;
  if (categoryError || postError) return <p>読み込みエラー</p>;
  if (!postData) return <p>記事が見つかりません</p>;
  if (!categoryData) return <p>カテゴリーが見つかりません</p>;

  const post = postData.post;
  const categories = categoryData.categories;

  const onSubmit: SubmitHandler<UpdateForm> = async (formData) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          thumbnailUrl: formData.thumbnailUrl,
          categories: formData.categoryIds.map((id) => ({id: Number(id)}))
        })
      });
      if (!res.ok) throw new Error("Network response was not ok");
      alert("更新しました")
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("削除に失敗しました");
      alert("記事を削除しました");
      // 削除後は一覧ページに遷移
      router.push("/admin/posts")
    } catch (error) {
      console.log("削除中にエラーが発生しました", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="px-5 pt-10">
      <h2 className="text-2xl font-bold">記事編集</h2>
      <form className="mt-20 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label name="title" label="タイトル" />
          <TextInput
            type="text"
            error={errors.title?.message}
            defaultValue={post.title}
            {...register("title", {required: "タイトルは必須です"})}
          />
        </div>
        <div>
          <Label name="content" label="内容" />
          <Textarea
            error={errors.content?.message}
            defaultValue={post.content}
            {...register("content", {required: "本文は必須です"})}
          />
        </div>
        <div>
          <Label name="thumbnailUrl" label="サムネイルURL" />
          <TextInput
            type="text"
            error={errors.thumbnailUrl?.message}
            defaultValue={post.thumbnailUrl}
            {...register("thumbnailUrl", {required: "サムネイルURLは必須です"})}
          />
        </div>
        <div>
          <Label name="categories" label="カテゴリー" />
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              category={category}
              defaultChecked={post.postCategories.some((pc) => pc.category.id === category.id)}
              {...register("categoryIds")}
            />
          ))}
        </div>
        <div className="mt-8 flex space-x-3">
          <input
            type="submit"
            value="更新"
            className="bg-blue-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer"
          />
          <input
            type="button"
            value="削除"
            onClick={handleDelete}
            className="bg-red-600 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer"
          />
        </div>
      </form>
    </div>
  )
}

export default PostUpdate;
