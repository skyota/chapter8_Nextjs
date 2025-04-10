"use client"

import useSWR from 'swr';
import { Post } from './_types/Post';
import fetcher from "./_utils/fetcher";
import PostCard from "@/app/_components/PostCard";

export default function Home() {
  const { data, error, isLoading } = useSWR<{ posts: Post[] }>(
    "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts",
    fetcher
  )

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>読み込みエラー</p>;
  if (!data) return <p>データが存在しません。</p>;

  return (
    <div className="mt-12">
      <div className="mx-auto max-w-3xl px-6">
        <ul className="space-y-10">
          {data.posts.map(post => (
            <li>
              <PostCard post={post} key={post.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
