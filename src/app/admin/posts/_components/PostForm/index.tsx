"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import Label from "../../../_components/Label";
import TextInput from "@/app//_components/TextInput"
import Textarea from "../../../_components/Textarea";
import Checkbox from "../../../_components/Checkbox";
import ImageInput from "../../../_components/ImageInput"; 
import { Post, Category } from "@/app/_types/Post";
import { supabase } from '@/app/_utils/supabase'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

type PostFormValues = {
  title: string;
  content: string;
  thumbnailImageKey: string;
  categoryIds: number[];
}

type Props = {
  isEdit?: boolean;
  categories: Category[];
  post?: Post;
  onSubmit: SubmitHandler<PostFormValues>;
  handleDelete?: () => void;
}

const PostForm: React.FC<Props> = ({isEdit, categories, post, onSubmit, handleDelete}) => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<PostFormValues>();
  
  const titleLabel = isEdit ? "編集" : "作成"

  const [uploading, setUploading] = useState(false)
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const filePath = `private/${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from("post-thumbnail") 
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    setUploading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.path) {
      setValue("thumbnailImageKey", data.path);
      alert("画像をアップロードしました！");
    }
  };

  const [previewPath, setPreviewPath] = useState<string | null>(null);

  useEffect(() => {
    if (!post?.thumbnailImageKey) return;
  
    const { data } = supabase.storage
      .from("post-thumbnail")
      .getPublicUrl(post.thumbnailImageKey);
  
    if (data?.publicUrl) {
      setPreviewPath(data.publicUrl);
    }
  }, [post?.thumbnailImageKey]);

  return (
    <div className="px-5 pt-10">
      <h2 className="text-2xl font-bold">記事{titleLabel}</h2>
      <form className="mt-20 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label name="title" label="タイトル" />
          <TextInput
            type="text"
            error={errors.title?.message}
            defaultValue={post?.title}
            {...register("title", {required: "タイトルは必須です"})}
          />
        </div>
        <div>
          <Label name="content" label="内容" />
          <Textarea
            error={errors.content?.message}
            defaultValue={post?.content}
            {...register("content", {required: "本文は必須です"})}
          />
        </div>
        <div>
          <Label name="thumbnailImageKey" label="サムネイルURL" />
          <ImageInput
            name="thumbnailImageKey"
            onChange={handleImageChange}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">アップロード中...</p>}
          {previewPath && (
            <div className="mt-2">
              <Image
                src={previewPath}
                alt="サムネイルプレビュー"
                width={400}
                height={400}
                className="rounded"
              />
            </div>
          )}
        </div>
        <div>
          <Label name="categories" label="カテゴリー" />
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              category={category}
              defaultChecked={post?.postCategories.some((pc) => pc.category.id === category.id)}
              {...register("categoryIds")}
            />
          ))}
        </div>
        <div className="mt-4">
          <input type='submit' value={titleLabel} className="bg-blue-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
            {isEdit && (
              <input type='button' value='削除' onClick={handleDelete} className="bg-red-700 text-white border font-bold px-4 py-2 rounded-lg cursor-pointer" />
            )}
        </div>
      </form>
    </div>
  )
}

export default PostForm;
