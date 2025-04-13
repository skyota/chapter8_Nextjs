"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Label from "../../_components/Label";
import TextInput from "../../_components/TextInput"
import Textarea from "../../_components/Textarea";
import Checkbox from "../../_components/Checkbox";
import useFetch from '@/app/_hooks/useFetch';
import { api } from "@/app/_utils/api";

type CreateForm = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categoryIds: number[];
}

const PostCreate: React.FC = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<CreateForm>();
  const { data: categoryData, error: categoryError, isLoading: categoryLoading } = useFetch<{ categories: Category[] }>("/api/admin/categories");
  const router = useRouter();

  if (categoryLoading) return <p>読み込み中...</p>;
  if (categoryError) return <p>読み込みエラー</p>;
  if (!categoryData) return <p>カテゴリーが見つかりません</p>;

  const categories = categoryData.categories;

  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
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
      reset();
      router.push("/admin/posts");
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  return (
    <div className="px-5 pt-10">
      <h2 className="text-2xl font-bold">記事作成</h2>
      <form className="mt-20 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label name="title" label="タイトル" />
          <TextInput
            type="text"
            error={errors.title?.message}
            {...register("title", {required: "タイトルは必須です"})}
          />
        </div>
        <div>
          <Label name="content" label="内容" />
          <Textarea
            error={errors.content?.message}
            {...register("content", {required: "本文は必須です"})}
          />
        </div>
        <div>
          <Label name="thumbnailUrl" label="サムネイルURL" />
          <TextInput
            type="text"
            error={errors.thumbnailUrl?.message}
            {...register("thumbnailUrl", {required: "サムネイルURLは必須です"})}
          />
        </div>
        <div>
          <Label name="categories" label="カテゴリー" />
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              category={category}
              {...register("categoryIds")}
            />
          ))}
        </div>
        <div className="mt-4">
          <input type='submit' value='作成' className="bg-blue-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
        </div>
      </form>
    </div>
  )
}

export default PostCreate;
