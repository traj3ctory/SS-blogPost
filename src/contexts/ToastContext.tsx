import Toast from "@/components/toast";
import { ReactNode, createContext, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

type ToastContextType = {
  showToast: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: IProps) => {
  const [toast, setToast] = useState<{
    message: string;
    duration?: number;
  } | null>(null);

  const showToast = (message: string, duration: number = 3000) => {
    setToast({ message, duration });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          duration={toast.duration}
          onClose={handleCloseToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
