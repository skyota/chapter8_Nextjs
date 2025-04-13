"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useParams } from "next/navigation";
import useFetch from "@/app/_hooks/useFetch";
import { Category } from "@/app/_types/Post";
import Label from "../../_components/Label";
import TextInput from "../../_components/TextInput"
import { useRouter } from "next/navigation";
import { api } from "@/app/_utils/api";

type UpdateForm = {
  name: string;
}

const CategoryUpdate: React.FC = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<UpdateForm>();

  const {id} = useParams<{id: string}>();
  const router = useRouter();
  const {data, error, isLoading} = useFetch<{category: Category}>(`/api/admin/categories/${id}`);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data) return <p>記事が見つかりません</p>;

  const category = data.category;

  const onSubmit: SubmitHandler<UpdateForm> = async (formData) => {
    try {
      const res = await api.put(`/api/admin/categories/${id}`,{
        name: formData.name,
      });
      if (!res.ok) throw new Error("Network response was not ok");
      alert("更新しました");
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/admin/categories/${id}`);
      if (!res.ok) throw new Error("削除に失敗しました");
      alert("カテゴリーを削除しました");
      // 削除後は一覧ページに遷移
      router.push("/admin/categories");
    } catch (error) {
      console.log("削除中にエラーが発生しました", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="px-5 pt-10">
      <h2 className="text-2xl font-bold">カテゴリー編集</h2>
      <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label name="name" label="カテゴリー名" />
          <TextInput
            type="text"
            error={errors.name?.message}
            defaultValue={category.name}
            {...register("name", {required: "カテゴリー名は必須です"})}
          />
        </div>
        <div className="mt-4 flex space-x-2">
          <input type='submit' value='更新' className="bg-blue-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
          <input type='button' value='削除' onClick={handleDelete} className="bg-red-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
        </div>
      </form>
    </div>
  )
}

export default CategoryUpdate;
