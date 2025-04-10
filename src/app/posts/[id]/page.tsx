"use client"

import useSWR from "swr";
import { useParams } from "next/navigation";

import formatDate from "../../_utils/formatDate";
import fetcher from "../../_utils/fetcher"
import { Post } from "../../_types/Post";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useSWR<{ post: Post }>(
    id ? `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}` : null,
    fetcher
    );

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました</p>;
  if (!data || !data.post) return <p>記事が見つかりません</p>;

  const { post } = data;

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="mt-12">
        <img src={post.thumbnailUrl} alt={post.title} />
      </div>
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between">
          <time dateTime={formatDate(post.createdAt, '-')} className="text-xs text-gray-500">
            {formatDate(post.createdAt, '/')}
          </time>
          <div className="flex items-center space-x-2">
            {post.categories.map((category) => (
              <p className="p-1 border border-blue-600 rounded text-xs text-blue-600">{category}</p>
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
