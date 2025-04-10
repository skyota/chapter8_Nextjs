"use client"

type Props = {
  name: string;
  label: string;
}

const Label: React.FC<Props> = ({ name, label }) => {
  return <label htmlFor={name} className="w-60">{label}</label>
};

export default Label;
