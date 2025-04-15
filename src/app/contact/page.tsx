"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import Label from './_components/Label';
import Textarea from './_components/Textarea';
import TextInput from '@/app/_components/TextInput';

type ContactForm = {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<ContactForm>();

  const onSubmit: SubmitHandler<ContactForm> = async (data) => {
    try {
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Network response was not ok");
      alert("送信しました");
      reset();
    } catch (error) {
      console.log("送信中にエラーが発生しました：", error);
    }
  };

  return (
    <div className="mt-7">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xl font-bold">問合わせフォーム</p>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-y-5">
            <Label name="name" label="お名前" />
            <TextInput
              type="text"
              error={errors.name?.message}
              disabled={isSubmitting}
              {...register("name", {
                required: "お名前は必須です",
                maxLength: {
                  value: 30,
                  message: "30文字以内で入力してください"
                }
              })}
            />
          </div>
          <div className="flex items-center space-y-5">
            <Label name="email" label="メールアドレス" />
            <TextInput
              type="email"
              error={errors.email?.message}
              disabled={isSubmitting}
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "メールアドレスの形式が正しくありません"
                }
              })}
            />
          </div>
          <div className="flex items-center space-y-5">
            <Label name="message" label="本文" />
            <Textarea
              error={errors.message?.message}
              disabled={isSubmitting}
              {...register("message", {
                required: "本文は必須です",
                maxLength: {
                  value: 500,
                  message: "500文字以内で入力してください"
                }
              })}
            />
          </div>
          <div className="mt-8 flex justify-center space-x-2">
            <input type='submit' value='送信' disabled={isSubmitting} className="bg-black text-white border border-black font-bold px-4 py-2 rounded-lg cursor-pointer" />
            <input type='reset' value='クリア' onClick={() => reset()} disabled={isSubmitting} className="bg-gray-300 text-black border border-gray-300 font-bold px-4 py-2 rounded-lg cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact;
