"use client"

import Sidebar from "./_components/Sidebar"
import { usePathname } from 'next/navigation'
import { useRouteGuard } from './_hooks/useRouteGuard'

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRouteGuard()

  const pathname = usePathname()
  const isSelected = (href: string) => {
    return pathname.includes(href)
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[calc(100%-250px)]">
        {children}
      </div>
    </div>
  );
}
