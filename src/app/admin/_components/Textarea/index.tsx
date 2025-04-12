"use client"

import { ComponentProps, forwardRef } from "react";

type Props = {
  name: string;
  error?: string;
} & ComponentProps<"textarea">

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ name, error, ...rest }, ref) => {
  return (
    <>
      <textarea
        id={name}
        name={name}
        ref={ref}
        className="w-full px-4 py-5 border border-gray-300 rounded-md min-h-50 leading-relaxed box-border"
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
});

export default Textarea;
