import React, { useState, useEffect } from 'react';
import './App.css';
import Abacus from './components/Abacus';
import StatusLED, { LEDStatus } from './components/StatusLED';
import DataToggle, { DataType } from './components/DataToggle';

const App: React.FC = () => {
  // Mock population value for testing
  const [population, setPopulation] = useState<number>(7900000000);
  // Mock debt value for testing
  const [debt, setDebt] = useState<number>(34000000000000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Add state for LED status and error count
  const [ledStatus, setLedStatus] = useState<LEDStatus>('neutral');
  const [errorCount, setErrorCount] = useState<number>(0);
  // Add state for active data type
  const [activeData, setActiveData] = useState<DataType>('population');

  // Simulate population increase for testing
  useEffect(() => {
    const interval = setInterval(() => {
      setPopulation(prev => prev + Math.floor(Math.random() * 10));
      setDebt(prev => prev + Math.floor(Math.random() * 100000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Function to handle LED click - will be used for showing error details later
  const handleLedClick = () => {
    console.log('LED clicked, error count:', errorCount);
    // This will be expanded later to show error details in a modal
  };

  // For testing: Toggle LED status when clicking the footer
  const cycleLedStatus = () => {
    setErrorCount(prev => {
      const newCount = prev + 1;
      
      // Update LED status based on error count
      if (newCount >= 3) {
        setLedStatus('error');
      } else if (newCount >= 1) {
        setLedStatus('warning');
      } else {
        setLedStatus('neutral');
      }
      
      return newCount;
    });
  };

  // Handle data type change
  const handleDataTypeChange = (dataType: DataType) => {
    setActiveData(dataType);
    console.log('Data type changed to:', dataType);
  };

  // Get current value based on active data type
  const getCurrentValue = () => {
    return activeData === 'population' ? population : debt;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Vintage Abacus Counter</h1>
        <p className="text-center text-gray-600 mt-2">
          {activeData === 'population' ? 'World Population' : 'U.S. National Debt'}
        </p>
      </header>
      <main className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {/* Abacus component */}
        <div className="mb-6">
          <Abacus 
            value={getCurrentValue()} 
            isLoading={isLoading} 
          />
        </div>
        
        <div className="flex justify-between items-center">
          {/* StatusLED component */}
          <StatusLED 
            status={ledStatus} 
            errorCount={errorCount} 
            onClick={handleLedClick} 
          />
          
          {/* DataToggle component */}
          <DataToggle 
            activeData={activeData} 
            onChange={handleDataTypeChange} 
          />
        </div>
      </main>
      <footer 
        className="mt-8 text-center text-gray-600 text-sm cursor-pointer hover:text-gray-800"
        onClick={cycleLedStatus}
      >
        <p>Vintage Abacus Demo App - {new Date().getFullYear()} (Click to test LED)</p>
      </footer>
    </div>
  );
};

export default App; 