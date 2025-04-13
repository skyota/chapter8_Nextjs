"use client"

import Link from "next/link"
import { Post } from "@/app/_types/Post";
import formatDate from "@/app/_utils/formatDate";

type Props = {
  post: Post;
}

const PostItem: React.FC<Props> = ({post}) => {
  return (
    <Link href={`/admin/posts/${post.id}`} className="p-3 block">
      <p className="text-bg font-bold">{post.title}</p>
      <div className="text-bg text-gray-500 mt-2">
        <time dateTime={formatDate(post.createdAt, '-')}>
          {formatDate(post.createdAt, '/')}
        </time>
      </div>
    </Link>
  )
}

export default PostItem;
