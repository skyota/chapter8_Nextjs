"use client"

import { useParams } from "next/navigation";

import formatDate from "../../_utils/formatDate";
import { MicroCmsPost } from "@/app/_types/Post";
import useFetch from '@/app/_hooks/useFetch';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useFetch<MicroCmsPost>(
    `https://04ucsc8i6k.microcms.io/api/v1/posts/${id}`
  );

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data) return <p>記事が見つかりません</p>;

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="mt-12">
        <img src={data.thumbnail.url} alt={data.title} className="w-full" />
      </div>
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between">
          <time dateTime={formatDate(data.createdAt, '-')} className="text-xs text-gray-500">
            {formatDate(data.createdAt, '/')}
          </time>
          <div className="flex items-center space-x-2">
            {data.categories.map((category) => (
              <p className="p-1 border border-blue-600 rounded text-xs text-blue-600">{category.name}</p>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-2xl">{data.title}</p>
        </div>
        <div className="mt-5 text-base" dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </div>
    </div>
  );
}

export default PostDetail;
