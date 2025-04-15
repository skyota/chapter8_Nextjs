"use client"

import Link from "next/link";
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { supabase } from '@/app/_utils/supabase'

const Navigation: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const { session, isLoading } = useSupabaseSession()

  return (
    <>
      <ul className="flex items-center justify-between h-[inherit]">
        <li>
          <Link href="/"  className="text-white text-xl font-bold">Blog</Link>
        </li>
        {!isLoading && (
          <li>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <Link href="/admin" className="header-link text-white text-xl font-bold">
                    管理画面
                  </Link>
                  <button onClick={handleLogout} className="text-white text-xl font-bold">
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link href="/contact" className="header-link text-white text-xl font-bold">
                    お問い合わせ
                  </Link>
                  <Link href="/login" className="header-link text-white text-xl font-bold">
                    ログイン
                  </Link>
                </>
              )}
            </div>
          </li>
        )}
      </ul>
    </>
  );
}

export default Navigation;
