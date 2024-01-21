import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: Props) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-gray-500 opacity-50"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed inset-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white p-6 rounded-lg shadow-md max-w-[400px] w-full min-h-[200px]"
    : "hidden";

  return (
    <>
      <div className={overlayClasses} onClick={onClose} />

      <div className={modalClasses}>
        <div className="flex justify-between items-center mb-5">
          <h3 className=" text-black">{title}</h3>
          <span className="cursor-pointer text-black" onClick={onClose}>
            X
          </span>
        </div>

        <div>{children}</div>
      </div>
    </>
  );
};
