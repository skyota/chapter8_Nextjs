'use client'

import { supabase } from '@/app/_utils/supabase'
import TextInput from '@/app/_components/TextInput';
import { useForm, SubmitHandler } from "react-hook-form";

type SignupForm = {
  email: string;
  password: string;
};

export default function Page() {

  const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm<SignupForm>();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });

    if (error) {
      alert("登録に失敗しました");
    } else {
      reset();
      alert("確認メールを送信しました。");
    }
  };

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
            登録
          </button>
        </div>
      </form>
    </div>
  )
}
