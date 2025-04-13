"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
}

const Menu: React.FC<Props> = ({href, label}) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <li>
      <Link href={href} className={`p-4 block ${isActive ? "bg-blue-100" : "hover:bg-gray-200"}`}>{label}</Link>
    </li>
  );
};

export default Menu;
