import React from 'react';
import { motion } from 'framer-motion';

export type DataType = 'population' | 'debt';

interface DataToggleProps {
  activeData: DataType;
  onChange: (dataType: DataType) => void;
}

const DataToggle: React.FC<DataToggleProps> = ({ activeData, onChange }) => {
  return (
    <div className="bg-amber-50 p-3 rounded-lg shadow-md border border-amber-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-amber-900">Display:</span>
        
        {/* Toggle container */}
        <div className="relative flex bg-amber-200 rounded-full p-1 h-8 w-56">
          {/* Sliding background */}
          <motion.div 
            className="absolute top-1 bottom-1 rounded-full bg-amber-500 shadow-sm"
            initial={false}
            animate={{
              x: activeData === 'population' ? 0 : '100%',
              width: '50%'
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          />
          
          {/* Population button */}
          <button
            className={`relative flex-1 px-3 py-1 rounded-full text-xs font-medium z-10 transition-colors duration-200 ${
              activeData === 'population' ? 'text-white' : 'text-amber-800'
            }`}
            onClick={() => onChange('population')}
          >
            World Population
          </button>
          
          {/* Debt button */}
          <button
            className={`relative flex-1 px-3 py-1 rounded-full text-xs font-medium z-10 transition-colors duration-200 ${
              activeData === 'debt' ? 'text-white' : 'text-amber-800'
            }`}
            onClick={() => onChange('debt')}
          >
            National Debt
          </button>
        </div>
      </div>
      
      {/* Data type description */}
      <div className="mt-2 text-xs text-amber-800">
        {activeData === 'population' ? (
          <p>Showing current world population with real-time updates</p>
        ) : (
          <p>Showing U.S. national debt with real-time updates</p>
        )}
      </div>
    </div>
  );
};

export default DataToggle; 