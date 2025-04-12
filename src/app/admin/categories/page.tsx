"use client"

import Link from "next/link"
import {Category} from "@/app/_type/Post"
import useFetch from "@/app/_hooks/useFetch";

const Categories: React.FC = () => {
  const {data, error, isLoading} = useFetch<{categories: Category[]}>("/api/admin/categories");
  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>読み込みエラー</p>;
  if (!data) return <p>カテゴリーが存在しません。</p>;

  return (
    <div className="px-5 pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">カテゴリー一覧</h2>
        <Link href="/admin/categories/new" className="px-4 py-2 bg-blue-500 rounded text-white font-bold">新規作成</Link>
      </div>
      <div className="mt-20">
        <ul className="space-y-6">
          {data.categories.map(category => (
            <li key={category.id} className="border-b border-gray-300">
              <Link href={`/admin/categories/${category.id}`} className="p-3 block text-bg font-bold">{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories
