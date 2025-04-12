"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import Label from "../../_components/Label";
import TextInput from "../../_components/TextInput"
import { useRouter } from "next/navigation";

type CreateForm = {
  name: string;
}

const CategoryCreate: React.FC = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<CreateForm>();
  const router = useRouter();
  
  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Network response was not ok");
      alert("カテゴリーを作成しました");
      reset();
      // 作成後は一覧ページに遷移
      router.push("/admin/categories");
    } catch (error) {
      console.log("送信中にエラーが発生しました", error);
    }
  };

  return (
    <div className="px-5 pt-10">
      <h2 className="text-2xl font-bold">カテゴリー作成</h2>
      <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label name="name" label="カテゴリー名" />
          <TextInput
            type="text"
            error={errors.name?.message}
            {...register("name", {required: "カテゴリー名は必須です"})}
          />
        </div>
        <div className="mt-4">
          <input type='submit' value='作成' className="bg-blue-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
        </div>
      </form>
    </div>
  )
}

export default CategoryCreate;
