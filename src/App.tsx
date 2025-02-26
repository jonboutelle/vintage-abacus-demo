import React, { useState } from 'react';
import './App.css';
import Abacus from './components/Abacus';
import StatusLED from './components/StatusLED';
import DataToggle from './components/DataToggle';
import WorldometerTest from './components/WorldometerTest';
import DataFetcherTest from './components/DataFetcherTest';
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
    increasePerSecond,
    setActiveDataType
  } = useAppContext();

  // State to toggle the Worldometer test component
  const [showWorldometerTest, setShowWorldometerTest] = useState(false);
  
  // State to toggle the DataFetcher test component
  const [showDataFetcherTest, setShowDataFetcherTest] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-4">
      {/* Vintage paper texture overlay */}
      <div className="absolute inset-0 bg-amber-50 opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.05\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")' }}></div>
      
      <header className="mb-8 relative">
        <h1 className="text-4xl font-bold text-center text-amber-900 drop-shadow-sm">
          Vintage Abacus Counter
        </h1>
        <p className="text-center text-amber-700 mt-2 text-lg">
          {activeDataType === 'population' ? 'World Population' : 'U.S. National Debt'}
        </p>
        <div className="text-center text-amber-600 mt-1 text-sm">
          {activeDataType === 'population' 
            ? `Increasing by ~${increasePerSecond.toFixed(1)} people per second` 
            : `Increasing by ~$${(increasePerSecond * 1000).toLocaleString()} per second`}
        </div>
      </header>
      
      <main className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 border border-amber-200 relative overflow-hidden">
        {/* Vintage paper texture for main content */}
        <div className="absolute inset-0 bg-amber-50 opacity-40 pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.05\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")' }}></div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute top-2 right-2 flex items-center text-amber-600 text-sm">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating data...
          </div>
        )}
        
        {/* Abacus component */}
        <div className="mb-8 relative z-10">
          <Abacus 
            value={getCurrentValue()} 
            isLoading={isLoading} 
          />
        </div>
        
        <div className="flex justify-between items-start gap-4 relative z-10">
          {/* StatusLED component */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-amber-700 mb-2">System Status</p>
            <StatusLED 
              status={ledStatus} 
              errorCount={errorCount} 
              onClick={handleLedClick} 
            />
          </div>
          
          {/* DataToggle component */}
          <DataToggle 
            activeData={activeDataType} 
            onChange={setActiveDataType} 
          />
        </div>
        
        {/* Test components toggle buttons */}
        <div className="mt-8 text-center flex flex-wrap justify-center gap-2">
          <button 
            onClick={() => setShowWorldometerTest(prev => !prev)}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm rounded border border-amber-300 transition-colors"
          >
            {showWorldometerTest ? 'Hide Worldometer Data' : 'Show Worldometer Data'}
          </button>
          
          <button 
            onClick={() => setShowDataFetcherTest(prev => !prev)}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm rounded border border-amber-300 transition-colors"
          >
            {showDataFetcherTest ? 'Hide DataFetcher Test' : 'Show DataFetcher Test'}
          </button>
        </div>
        
        {/* Worldometer Test component */}
        {showWorldometerTest && (
          <div className="mt-6">
            <WorldometerTest />
          </div>
        )}
        
        {/* DataFetcher Test component */}
        {showDataFetcherTest && (
          <div className="mt-6">
            <DataFetcherTest />
          </div>
        )}
      </main>
      
      <footer className="mt-8 text-center text-amber-700 text-sm">
        <p>Vintage Abacus Demo App - {new Date().getFullYear()}</p>
        <p className="text-xs mt-1 text-amber-600">Data updates in real-time</p>
      </footer>
    </div>
  );
};

export default App; 