"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import Label from "../../../_components/Label";
import TextInput from "../../../_components/TextInput"

type CategoryFormValues = {
  name: string;
}

type Props = {
  isEdit?: boolean;
  defaultValue?: string;
  onSubmit: SubmitHandler<CategoryFormValues>;
  handleDelete?: () => void;
}

const CategoryForm: React.FC<Props> = ({isEdit, defaultValue, onSubmit, handleDelete}) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CategoryFormValues>(isEdit ? {defaultValues: {name: defaultValue}} : undefined);
  const titleLabel = isEdit ? "編集" : "作成"

  return (
    <div className="px-5 pt-10">
      <h2 className="text-2xl font-bold">カテゴリー{titleLabel}</h2>
      <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label name="name" label="カテゴリー名" />
          <TextInput
            type="text"
            error={errors.name?.message}
            {...register("name", {required: "カテゴリー名は必須です"})}
          />
        </div>
        <div className={`mt-4 flex ${isEdit ? "space-x-2" : ""}`}>
          <input type='submit' value={titleLabel} className="bg-blue-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
          {isEdit && (
            <input type='button' value='削除' onClick={handleDelete} className="bg-red-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
          )}
        </div>
      </form>
    </div>
  )
}

export default CategoryForm;
