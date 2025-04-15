'use client'

import { supabase } from '@/app/_utils/supabase'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from '@/app/_components/TextInput'

type LoginForm = {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter()
  const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm<LoginForm>()

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('ログインに失敗しました');
    } else {
      reset();
      router.replace('/admin/posts');
    }
  }

  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px]">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <TextInput
            name="email"
            type="email"
            placeholder="name@company.com"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "正しいメールアドレスを入力してください",
              },
            })}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <TextInput
            name="password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            disabled={isSubmitting}
            {...register("password", {
              required: "パスワードは必須です",
            })}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  )
}
