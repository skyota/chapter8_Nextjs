"use client"

import PostCard from "@/app/_components/PostCard";
import usePosts from '@/app/_hooks/usePosts';

export default function Home() {
  const { data, error, isLoading } = usePosts();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>読み込みエラー</p>;
  if (!data) return <p>データが存在しません。</p>;

  return (
    <div className="mt-12">
      <div className="mx-auto max-w-3xl px-6">
        <ul className="space-y-10">
          {data.posts.map(post => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
