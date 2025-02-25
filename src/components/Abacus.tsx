import React from 'react';
import { motion } from 'framer-motion';

interface AbacusProps {
  value: number;
  isLoading?: boolean;
}

// Helper function to get individual digits from a number
const getDigits = (num: number): number[] => {
  return num.toString().padStart(10, '0').split('').map(Number);
};

const Abacus: React.FC<AbacusProps> = ({ value = 0, isLoading = false }) => {
  const digits = getDigits(value);
  
  // Number of rows (digits) in the abacus
  const rows = 10;
  
  // Number of beads per row
  const beadsPerRow = 10;
  
  return (
    <div className="relative w-full">
      {/* Abacus frame */}
      <div className="bg-amber-800 rounded-lg p-4 shadow-lg border-4 border-amber-900">
        {/* Abacus title */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-amber-100">
            {isLoading ? 'Loading...' : 'World Population'}
          </h2>
          <p className="text-amber-200 text-sm">Current count: {value.toLocaleString()}</p>
        </div>
        
        {/* Abacus body */}
        <div className="bg-amber-700 p-4 rounded-md shadow-inner">
          {/* Abacus rods */}
          <div className="flex flex-col space-y-3">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center">
                {/* Row label (power of 10) */}
                <div className="w-12 text-right pr-2 text-amber-200 font-mono">
                  10<sup>{rows - rowIndex - 1}</sup>
                </div>
                
                {/* Rod with beads */}
                <div className="flex-1 h-8 bg-amber-900 rounded-full flex items-center px-1 relative">
                  {/* Beads */}
                  {Array.from({ length: beadsPerRow }).map((_, beadIndex) => {
                    const isActive = beadIndex < digits[rowIndex];
                    return (
                      <motion.div
                        key={beadIndex}
                        className={`h-6 w-6 rounded-full mx-0.5 shadow-md ${
                          isActive ? 'bg-amber-500' : 'bg-amber-300'
                        }`}
                        initial={{ x: 0 }}
                        animate={{ 
                          x: isActive ? beadIndex * 8 : 0,
                          backgroundColor: isActive ? '#f59e0b' : '#fcd34d'
                        }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 100, 
                          damping: 15,
                          delay: rowIndex * 0.05
                        }}
                      />
                    );
                  })}
                  
                  {/* Rod divider */}
                  <div className="absolute right-1/2 h-full w-0.5 bg-amber-950"></div>
                </div>
                
                {/* Current digit display */}
                <div className="w-8 text-center ml-2 bg-amber-100 rounded-md font-mono text-amber-900 font-bold">
                  {digits[rowIndex]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abacus base */}
        <div className="h-4 bg-amber-900 mt-2 rounded-b-lg shadow-md"></div>
      </div>
      
      {/* Wood grain overlay for vintage effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-800/10 to-amber-950/20 pointer-events-none rounded-lg"></div>
    </div>
  );
};

export default Abacus; 