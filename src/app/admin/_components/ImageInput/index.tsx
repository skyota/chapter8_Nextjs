"use client"

import { ComponentProps, forwardRef } from "react";

type Props = {
  name: string;
} & ComponentProps<"input">

const ImageInput = forwardRef<HTMLInputElement, Props>(({ name, ...rest }, ref) => {
  return (
    <>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        ref={ref}
        className="w-full px-4 py-5 min-h-50 box-border"
        {...rest}
      />
    </>
  );
});

export default ImageInput;
