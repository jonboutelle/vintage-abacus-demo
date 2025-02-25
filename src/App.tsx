import React, { useState, useEffect } from 'react';
import './App.css';
import Abacus from './components/Abacus';

const App: React.FC = () => {
  // Mock population value for testing
  const [population, setPopulation] = useState<number>(7900000000);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Simulate population increase for testing
  useEffect(() => {
    const interval = setInterval(() => {
      setPopulation(prev => prev + Math.floor(Math.random() * 10));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Vintage Abacus World Population Counter</h1>
      </header>
      <main className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {/* Abacus component */}
        <div className="mb-6">
          <Abacus value={population} isLoading={isLoading} />
        </div>
        
        <div className="flex justify-between items-center">
          {/* StatusLED component will go here */}
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* DataToggle component will go here */}
          <div className="bg-gray-200 p-2 rounded-md">
            <p className="text-sm text-gray-600">Toggle will go here</p>
          </div>
        </div>
      </main>
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>Vintage Abacus Demo App - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App; 