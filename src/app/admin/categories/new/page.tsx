"use client"

import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "@/app/_utils/api";
import CategoryForm from "../_components/CategoryForm/index";
import { CreateCategoryRequestBody } from "../../../api/admin/categories/route";

const CategoryCreate: React.FC = () => {
  const router = useRouter();
  
  const onSubmit: SubmitHandler<CreateCategoryRequestBody> = async (data) => {
    try {
      const res = await api.post<CreateCategoryRequestBody>("/api/admin/categories", data);
      if (!res.ok) throw new Error("Network response was not ok");
      alert("カテゴリーを作成しました");
      // 作成後は一覧ページに遷移
      router.push("/admin/categories");
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  return <CategoryForm onSubmit={onSubmit} />;
}

export default CategoryCreate;
