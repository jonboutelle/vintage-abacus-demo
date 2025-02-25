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
  
  // Bead size and spacing
  const beadSize = 24; // in pixels
  const beadGap = 4; // in pixels
  const beadSpacing = beadSize + beadGap;
  
  // Calculate the total width needed for all beads
  const totalBeadWidth = beadsPerRow * beadSpacing;
  
  return (
    <div className="relative w-full">
      {/* Abacus frame */}
      <div className="bg-amber-800 rounded-lg p-4 shadow-lg border-4 border-amber-900">
        {/* Abacus title */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-amber-100">
            {isLoading ? 'Loading...' : (value > 1000000000 ? 'World Population' : 'U.S. National Debt')}
          </h2>
          <p className="text-amber-200 text-sm">Current count: {value.toLocaleString()}</p>
        </div>
        
        {/* Abacus body */}
        <div className="bg-amber-700 p-4 rounded-md shadow-inner">
          {/* Abacus rods */}
          <div className="flex flex-col space-y-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center">
                {/* Row label (power of 10) */}
                <div className="w-12 text-right pr-2 text-amber-200 font-mono">
                  10<sup>{rows - rowIndex - 1}</sup>
                </div>
                
                {/* Rod with beads */}
                <div className="flex-1 h-10 bg-amber-900 rounded-full relative overflow-hidden">
                  {/* Rod divider */}
                  <div className="absolute left-1/2 h-full w-0.5 bg-amber-950 z-20"></div>
                  
                  {/* Inactive beads area (right side) */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-start pl-2">
                    {Array.from({ length: beadsPerRow }).map((_, beadIndex) => {
                      const digit = digits[rowIndex];
                      const isActive = beadIndex < digit;
                      
                      // Only render inactive beads on the right side
                      if (isActive) return null;
                      
                      return (
                        <motion.div
                          key={`inactive-${beadIndex}`}
                          className="rounded-full shadow-md bg-amber-300 absolute"
                          style={{
                            width: beadSize,
                            height: beadSize,
                            left: beadIndex * beadSpacing
                          }}
                          animate={{ 
                            backgroundColor: '#fcd34d',
                            opacity: 0.8
                          }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 300, 
                            damping: 25
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Active beads area (left side) */}
                  <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-2">
                    {Array.from({ length: beadsPerRow }).map((_, beadIndex) => {
                      const digit = digits[rowIndex];
                      const isActive = beadIndex < digit;
                      
                      // Only render active beads on the left side
                      if (!isActive) return null;
                      
                      return (
                        <motion.div
                          key={`active-${beadIndex}`}
                          className="rounded-full shadow-md bg-amber-500 absolute"
                          style={{
                            width: beadSize,
                            height: beadSize,
                            right: (digit - beadIndex - 1) * beadSpacing
                          }}
                          animate={{ 
                            backgroundColor: '#f59e0b',
                            opacity: 1
                          }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 300, 
                            damping: 25,
                            delay: rowIndex * 0.05
                          }}
                        />
                      );
                    })}
                  </div>
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