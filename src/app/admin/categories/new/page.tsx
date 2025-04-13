"use client"

import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "@/app/_utils/api";
import CategoryForm from "../_components/CategoryForm/index";
import { CategoryRequestBody } from "@/types/requestBody";

type CreateForm = {
  name: string;
}

const CategoryCreate: React.FC = () => {
  const router = useRouter();
  
  const onSubmit: SubmitHandler<CreateForm> = async (data: CategoryRequestBody) => {
    try {
      const res = await api.post("/api/admin/categories", data);
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
