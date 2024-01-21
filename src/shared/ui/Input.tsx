import { HTMLProps } from "react";

export const Input: React.FC<HTMLProps<HTMLInputElement>> = ({
  value,
  onChange,
}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type="text"
      className="bg-gray-200 border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
      placeholder="Enter your text"
    />
  );
};
