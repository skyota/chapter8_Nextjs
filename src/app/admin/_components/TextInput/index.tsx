"use client"

import { ComponentProps, forwardRef } from "react";

type Props = {
  name: string;
  type: string;
  error?: string;
} & ComponentProps<"input">

const TextInput = forwardRef<HTMLInputElement, Props>(({ name, type, error, ...rest }, ref) => {
  return (
    <>
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        className="w-full px-4 py-5 border border-gray-300 rounded-md min-h-50 box-border"
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
});

export default TextInput;
