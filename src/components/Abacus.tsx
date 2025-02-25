import React, { useState } from 'react';
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
  // Add state for debug mode
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  const digits = getDigits(value);
  
  // Soroban abacus configuration
  const columns = 10; // Number of columns (digits)
  
  // Bead configuration
  const oneBeadsPerColumn = 4; // Number of "one" beads per column
  const fiveBeadsPerColumn = 1; // Number of "five" beads per column
  
  // Bead size and spacing
  const beadSize = 24; // in pixels
  const beadGap = 4; // in pixels
  const beadSpacing = beadSize + beadGap;
  
  // Beam configuration
  const beamHeight = 1; // Height of the beam in pixels
  const sectionGap = 16; // Gap between beam and beads when inactive
  
  // Calculate positions
  // We'll work from the beam position as our reference point
  const beamPosition = 60; // Position of the beam from the top
  
  // Five bead (upper section) positions
  const fiveBeadInactivePosition = 12; // Position when inactive (at the top)
  const fiveBeadActivePosition = 28; // Position when active (touching the beam)
  
  // One beads (lower section) positions
  const oneBeadSectionStart = beamPosition + beamHeight + sectionGap; // Start of the lower section
  
  // Calculate heights for layout
  const fiveBeadSectionHeight = beamPosition; // Height of the five bead section
  const oneBeadSectionHeight = oneBeadsPerColumn * beadSpacing; // Height of the one beads section
  const totalColumnHeight = fiveBeadSectionHeight + oneBeadSectionHeight + sectionGap; // Total height
  
  // Debug values for rightmost column (index 9)
  const debugColumnIndex = 9; // Rightmost column
  const debugDigit = digits[debugColumnIndex];
  const debugOneValue = debugDigit % 5; // Value represented by "one" beads (0-4)
  const debugFiveValue = Math.floor(debugDigit / 5); // Value represented by "five" bead (0 or 1)
  
  // Calculate debug positions for one beads
  const debugOneBeadPositions = Array.from({ length: oneBeadsPerColumn }).map((_, beadIndex) => {
    const isActive = beadIndex < debugOneValue;
    const activePosition = -21 + (beadIndex * beadSpacing);
    const inactivePosition = 95 - ((oneBeadsPerColumn - 1 - beadIndex) * beadSpacing);
    return {
      index: beadIndex,
      isActive,
      position: isActive ? activePosition : inactivePosition
    };
  });
  
  // Debug position for five bead
  const debugFiveBeadPosition = debugFiveValue > 0 ? fiveBeadActivePosition : fiveBeadInactivePosition;
  
  return (
    <div className="relative w-full">
      {/* Debug information panel - only shown when debug mode is enabled */}
      {showDebugInfo && (
        <div className="absolute left-0 top-0 bg-white/90 p-2 rounded border border-gray-300 text-xs font-mono z-50 text-black">
          <div className="font-bold mb-1">Debug Info (Column {debugColumnIndex + 1}):</div>
          <div>Beam Position: {beamPosition}px</div>
          <div>Beam Height: {beamHeight}px</div>
          <div>Beam Range: {beamPosition}px to {beamPosition + beamHeight}px</div>
          <div className="mt-1">Five Bead:</div>
          <div className="pl-2">Value: {debugFiveValue}</div>
          <div className="pl-2">Position: {debugFiveBeadPosition}px</div>
          <div className="mt-1">One Beads:</div>
          {debugOneBeadPositions.map((bead) => (
            <div key={`debug-one-${bead.index}`} className="pl-2">
              Bead {bead.index + 1}: {bead.position}px ({bead.isActive ? 'active' : 'inactive'})
            </div>
          ))}
        </div>
      )}
      
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
          {/* Column labels (powers of 10) */}
          <div className="flex justify-between mb-2">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={`label-${colIndex}`} className="text-center text-amber-200 font-mono text-xs w-10">
                10<sup>{columns - colIndex - 1}</sup>
              </div>
            ))}
          </div>
          
          {/* Soroban abacus frame */}
          <div className="relative bg-amber-900 rounded-lg p-2 shadow-inner">
            {/* Horizontal beam (divider between one and five beads) */}
            <div 
              className="absolute left-0 right-0 h-1 bg-amber-950 z-20" 
              style={{ top: `${beamPosition}px` }}
            ></div>
            
            {/* Vertical rods */}
            <div className="flex justify-between h-full">
              {Array.from({ length: columns }).map((_, colIndex) => {
                const digit = digits[colIndex];
                const oneValue = digit % 5; // Value represented by "one" beads (0-4)
                const fiveValue = Math.floor(digit / 5); // Value represented by "five" bead (0 or 1)
                
                // Show position values for rightmost column
                const showDebug = colIndex === debugColumnIndex;
                
                return (
                  <div 
                    key={`col-${colIndex}`} 
                    className="relative" 
                    style={{ width: beadSize, height: totalColumnHeight }}
                  >
                    {/* Vertical rod */}
                    <div 
                      className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-950 z-10 transform -translate-x-1/2"
                    ></div>
                    
                    {/* Current digit display */}
                    <div 
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-100 rounded-md font-mono text-amber-900 font-bold text-center w-8"
                    >
                      {digit}
                    </div>
                    
                    {/* Five beads section (upper) */}
                    <div 
                      className="absolute top-0 left-0 right-0" 
                      style={{ height: fiveBeadSectionHeight }}
                    >
                      {Array.from({ length: fiveBeadsPerColumn }).map((_, beadIndex) => {
                        const isActive = fiveValue > 0;
                        const position = isActive ? fiveBeadActivePosition : fiveBeadInactivePosition;
                        
                        return (
                          <motion.div
                            key={`five-${beadIndex}`}
                            className={`absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md bg-amber-500`}
                            style={{
                              width: beadSize,
                              height: beadSize,
                              top: position
                            }}
                            animate={{ 
                              opacity: 1,
                              top: position
                            }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 300, 
                              damping: 25,
                              delay: colIndex * 0.05
                            }}
                          >
                            {/* Position value for debugging - only shown when debug mode is enabled */}
                            {showDebug && showDebugInfo && (
                              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-amber-950">
                                {position}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* One beads section (lower) */}
                    <div 
                      className="absolute left-0 right-0" 
                      style={{ top: oneBeadSectionStart, height: oneBeadSectionHeight }}
                    >
                      {Array.from({ length: oneBeadsPerColumn }).map((_, beadIndex) => {
                        const isActive = beadIndex < oneValue;
                        
                        // Calculate positions for each bead
                        const activePosition = -21 + (beadIndex * beadSpacing);
                        const inactivePosition = 95 - ((oneBeadsPerColumn - 1 - beadIndex) * beadSpacing);
                        const position = isActive ? activePosition : inactivePosition;
                        
                        return (
                          <motion.div
                            key={`one-${beadIndex}`}
                            className={`absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md bg-amber-500`}
                            style={{
                              width: beadSize,
                              height: beadSize,
                              top: position
                            }}
                            animate={{ 
                              opacity: 1,
                              top: position
                            }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 300, 
                              damping: 25,
                              delay: colIndex * 0.05 + beadIndex * 0.02
                            }}
                          >
                            {/* Position value for debugging - only shown when debug mode is enabled */}
                            {showDebug && showDebugInfo && (
                              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-amber-950">
                                {position}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Abacus base */}
        <div className="h-4 bg-amber-900 mt-10 rounded-b-lg shadow-md"></div>
      </div>
      
      {/* Wood grain overlay for vintage effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-800/10 to-amber-950/20 pointer-events-none rounded-lg"></div>
      
      {/* Debug toggle button */}
      <div className="mt-4 text-center">
        <button 
          onClick={() => setShowDebugInfo(prev => !prev)}
          className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs rounded border border-amber-300 transition-colors"
        >
          {showDebugInfo ? 'Hide Debug Info' : 'Show Debug Info'}
        </button>
      </div>
    </div>
  );
};

export default Abacus; 