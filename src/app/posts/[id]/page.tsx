"use client"

import { useParams } from "next/navigation";
import Image from "next/image";

import formatDate from "../../_utils/formatDate";
import usePost from '@/app/_hooks/usePost';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = usePost(id);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data) return <p>記事が見つかりません</p>;

  const post = data.post;

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="mt-12">
        <Image height={500} width={500} src={post.thumbnailUrl} alt={post.title} className="w-full" />
      </div>
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between">
          <time dateTime={formatDate(post.createdAt, '-')} className="text-xs text-gray-500">
            {formatDate(post.createdAt, '/')}
          </time>
          <div className="flex items-center space-x-2">
            {post.postCategories.map((postcategory) => (
              <p className="p-1 border border-blue-600 rounded text-xs text-blue-600">{postcategory.category.name}</p>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-2xl">{post.title}</p>
        </div>
        <div className="mt-5 text-base" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}

export default PostDetail;
