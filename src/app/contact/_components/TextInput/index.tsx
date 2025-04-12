"use client"

import { ComponentProps, forwardRef } from "react";

type Props = {
  name: string;
  type: string;
  error?: string;
} & ComponentProps<"input">

const TextInput = forwardRef<HTMLInputElement, Props>(({ name, type, error, disabled, ...rest }, ref) => {
  return (
    <div className="w-full max-w-[calc(100%-240px)]">
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        ref={ref}
        className="w-full px-4 py-5 border border-gray-300 rounded-md min-h-50 box-border"
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
});

export default TextInput;
