import { useEffect } from 'react';
import { X } from 'lucide-react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 4000, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        <h4 className="toast-title">{title}</h4>
        {message && <p className="toast-message">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="toast-close"
        aria-label="Fechar notificação"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
