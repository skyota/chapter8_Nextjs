"use client"

import Menu from "./Menu/Menu";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[250px] h-screen bg-gray-100">
      <ul>
        <Menu href="/admin/posts" label="記事一覧" />
        <Menu href="/admin/categories" label="カテゴリー一覧" />
      </ul>
    </aside>
  )
}

export default Sidebar;
