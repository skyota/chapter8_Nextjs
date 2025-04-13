"use client"

import Link from "next/link"
import useAdminPosts from '@/app/_hooks/useAdminPosts';
import PostItem from "./_components/PostItem";

const Posts: React.FC = () => {
  const { data, error, isLoading } = useAdminPosts();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>読み込みエラー</p>;
  if (!data) return <p>データが存在しません。</p>;

  return (
    <div className="px-5 pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">記事一覧</h2>
        <Link href="/admin/posts/new" className="px-4 py-2 bg-blue-500 rounded text-white font-bold">新規作成</Link>
      </div>
      <div className="mt-20">
        <ul className="space-y-6">
          {data.posts.map(post => (
            <li key={post.id} className="border-b border-gray-300">
              <PostItem post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts
