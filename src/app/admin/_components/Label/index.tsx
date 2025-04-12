"use client"

type Props = {
  name: string;
  label: string;
}

const Label: React.FC<Props> = ({name, label}) => {
  return <label htmlFor={name}>{label}</label>
};

export default Label;
