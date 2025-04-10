"use client"

import { ComponentProps } from "react";

type Props = {
  name: string;
  error?: string;
} & ComponentProps<"textarea">

const Textarea: React.FC<Props> = ({ name, error, disabled, ...rest }) => {
  return (
    <div className="w-full max-w-[calc(100%-240px)]">
      <textarea id={name} disabled={disabled} className="w-full px-4 py-5 border border-gray-300 rounded-md min-h-50 leading-relaxed box-border" {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Textarea;
