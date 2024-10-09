import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  handleModalWindow: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalWindowProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider value={{ isOpen, handleModalWindow }}>
      {children}
    </ModalContext.Provider>
  );
};

