import React from 'react';
import { motion } from 'framer-motion';

export type LEDStatus = 'neutral' | 'warning' | 'error';

interface StatusLEDProps {
  status: LEDStatus;
  errorCount?: number;
  onClick?: () => void;
}

const StatusLED: React.FC<StatusLEDProps> = ({ 
  status = 'neutral', 
  errorCount = 0,
  onClick
}) => {
  // Define colors for different statuses
  const colors = {
    neutral: {
      outer: 'bg-gray-300',
      inner: 'bg-green-500',
      glow: 'shadow-[0_0_10px_rgba(74,222,128,0.5)]'
    },
    warning: {
      outer: 'bg-gray-300',
      inner: 'bg-orange-500',
      glow: 'shadow-[0_0_10px_rgba(249,115,22,0.5)]'
    },
    error: {
      outer: 'bg-gray-300',
      inner: 'bg-red-500',
      glow: 'shadow-[0_0_10px_rgba(239,68,68,0.7)]'
    }
  };

  const currentColors = colors[status];

  return (
    <div 
      className="relative cursor-pointer group" 
      onClick={onClick}
      title={errorCount > 0 ? `${errorCount} error${errorCount > 1 ? 's' : ''} detected` : 'System status normal'}
    >
      {/* LED housing */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentColors.outer} transition-all duration-300`}>
        {/* LED light */}
        <motion.div 
          className={`w-8 h-8 rounded-full ${currentColors.inner} ${currentColors.glow} transition-all duration-300`}
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: status === 'error' ? 0.8 : 2,
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {status === 'neutral' && 'System status: Normal'}
        {status === 'warning' && `Warning: ${errorCount} error detected`}
        {status === 'error' && `Alert: ${errorCount} errors detected`}
      </div>
    </div>
  );
};

export default StatusLED; 