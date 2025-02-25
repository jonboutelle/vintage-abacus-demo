import React from 'react';
import './App.css';
import Abacus from './components/Abacus';
import StatusLED from './components/StatusLED';
import DataToggle from './components/DataToggle';
import { useAppContext } from './context/AppContext';

const App: React.FC = () => {
  const {
    population,
    debt,
    activeDataType,
    isLoading,
    ledStatus,
    errorCount,
    errorMessages,
    setActiveDataType
  } = useAppContext();

  // Function to handle LED click - will be used for showing error details later
  const handleLedClick = () => {
    console.log('LED clicked, error count:', errorCount);
    console.log('Error messages:', errorMessages);
    // This will be expanded later to show error details in a modal
  };

  // Get current value based on active data type
  const getCurrentValue = () => {
    return activeDataType === 'population' ? population : debt;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Vintage Abacus Counter</h1>
        <p className="text-center text-gray-600 mt-2">
          {activeDataType === 'population' ? 'World Population' : 'U.S. National Debt'}
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
            activeData={activeDataType} 
            onChange={setActiveDataType} 
          />
        </div>
      </main>
      <footer 
        className="mt-8 text-center text-gray-600 text-sm cursor-pointer hover:text-gray-800"
      >
        <p>Vintage Abacus Demo App - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App; 