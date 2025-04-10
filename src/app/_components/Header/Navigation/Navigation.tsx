"use client"

import Link from "next/link";

const Navigation: React.FC = () => {
  return (
    <>
      <ul className="flex items-center justify-between h-[inherit]">
        <li>
          <Link href="/"  className="text-white text-xl font-bold">Blog</Link>
        </li>
        <li>
          <Link href="/contact"  className="text-white text-xl font-bold">お問い合わせ</Link>
        </li>
      </ul>
    </>
  );
}

export default Navigation;
