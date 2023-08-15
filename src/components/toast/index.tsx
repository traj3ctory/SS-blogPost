import { useEffect, useState } from "react";
import "./Toast.scss";

interface IProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default ({ message, duration = 5000, onClose }: IProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? <div className="toast">{message}</div> : null;
};
