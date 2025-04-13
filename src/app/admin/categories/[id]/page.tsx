"use client"

import { SubmitHandler } from "react-hook-form"
import { useParams } from "next/navigation";
import useCategory from "@/app/_hooks/useCategory";
import { useRouter } from "next/navigation";
import { api } from "@/app/_utils/api";
import CategoryForm from "../_components/CategoryForm";
import { UpdateCategoryBody } from "../../../api/admin/categories/[id]/route";

const CategoryUpdate: React.FC = () => {

  const {id} = useParams<{id: string}>();
  const router = useRouter();
  const {data, error, isLoading} = useCategory(id);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data) return <p>記事が見つかりません</p>;

  const category = data.category;

  const onSubmit: SubmitHandler<UpdateCategoryBody> = async (formData) => {
    try {
      const res = await api.put<UpdateCategoryBody>(`/api/admin/categories/${id}`,{
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

  return <CategoryForm isEdit={true} defaultValue={category.name} onSubmit={onSubmit} handleDelete={handleDelete} />;
}

export default CategoryUpdate;
