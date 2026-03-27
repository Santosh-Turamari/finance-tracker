import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ show, message, type }) => {
  if (!show) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />
  };

  const colors = {
    success: 'bg-emerald-500/90',
    error: 'bg-red-500/90',
    info: 'bg-blue-500/90'
  };

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-lg backdrop-blur-md text-white font-medium text-sm flex items-center gap-2 transition-all duration-300 ${colors[type]}`}>
      {icons[type]}
      {message}
    </div>
  );
};

export default Notification;