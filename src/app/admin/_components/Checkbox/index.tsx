"use client"

import { ComponentProps, forwardRef } from "react";

type Props = {
  category: {
    id: number;
    name: string;
  };
  defaultChecked?: boolean;
} & ComponentProps<"input">

const Checkbox = forwardRef<HTMLInputElement, Props>(({category, defaultChecked, ...rest}, ref) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="categoryIds"
        value={category.id}
        defaultChecked={defaultChecked}
        ref={ref}
        {...rest}
      />
      <span>{category.name}</span>
    </label>
  );
});

export default Checkbox;
