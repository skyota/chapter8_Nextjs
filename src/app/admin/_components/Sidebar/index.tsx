"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="w-[250px] h-screen bg-gray-100">
      <ul>
        <li>
          <Link href="/admin/posts" className={`p-4 block ${pathname.startsWith("/admin/posts") ? "bg-blue-100" : "hover:bg-gray-200"}`}>記事一覧</Link>
        </li>
        <li>
          <Link href="/admin/categories" className={`p-4 block ${pathname.startsWith("/admin/categories") ? "bg-blue-100" : "hover:bg-gray-200"}`}>カテゴリー一覧</Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar;
