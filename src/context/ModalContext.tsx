import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  handleModalWindow: () => void;
  setIsOpen: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalWindowProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider value={{ isOpen, handleModalWindow, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

