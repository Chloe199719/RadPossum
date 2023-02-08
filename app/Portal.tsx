import React from "react";
import { createPortal } from "react-dom";

type Props = {
  fun: React.Dispatch<React.SetStateAction<boolean>>;
};
function Modal({ fun }: Props) {
  return createPortal(
    <div
      onClick={() => {
        fun(false);
      }}
      className=" absolute inset-0 z-20 "
    ></div>,
    document.getElementById(`modal`) as HTMLDivElement
  );
}

export default Modal;
