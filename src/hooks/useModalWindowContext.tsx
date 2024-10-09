import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";

export const useModalWindowContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext not works");
  }
  return context;
}
