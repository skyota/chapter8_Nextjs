"use client"

import Sidebar from "./_components/Sidebar"

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[calc(100%-250px)]">
        {children}
      </div>
    </div>
  );
}
