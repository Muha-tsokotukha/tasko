import { HTMLProps } from "react";

type Props = {
  styles?: string;
};

export const Button: React.FC<HTMLProps<HTMLButtonElement> & Props> = ({
  onClick,
  styles,
  children,
}) => {
  return (
    <button
      className={`bg-blue-500 text-white p-4 rounded-lg ${
        styles ? styles : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
