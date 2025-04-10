"use client"

import { ComponentProps } from "react";

type Props = {
  name: string;
  type: string;
  error?: string;
} & ComponentProps<"input">

const TextInput: React.FC<Props> = ({ name, type, error, disabled, ...rest }) => {
  return (
    <div className="w-full max-w-[calc(100%-240px)]">
      <input id={name} type={type} disabled={disabled} className="w-full px-4 py-5 border border-gray-300 rounded-md min-h-50 box-border" {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
