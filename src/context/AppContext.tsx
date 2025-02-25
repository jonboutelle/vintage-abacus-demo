import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LEDStatus } from '../components/StatusLED';
import { DataType } from '../components/DataToggle';

// Define the shape of our context state
interface AppContextState {
  // Data values
  population: number;
  debt: number;
  activeDataType: DataType;
  isLoading: boolean;
  
  // Error handling
  ledStatus: LEDStatus;
  errorCount: number;
  errorMessages: string[];
  
  // Calculated values
  increasePerSecond: number;
  
  // Actions
  setActiveDataType: (dataType: DataType) => void;
  resetErrors: () => void;
  addError: (message: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextState | undefined>(undefined);

// Provider props interface
interface AppContextProviderProps {
  children: ReactNode;
}

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

// Provider component
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  // Data states
  const [population, setPopulation] = useState<number>(7900000000);
  const [debt, setDebt] = useState<number>(34000000000000);
  const [activeDataType, setActiveDataType] = useState<DataType>('population');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Error states
  const [ledStatus, setLedStatus] = useState<LEDStatus>('neutral');
  const [errorCount, setErrorCount] = useState<number>(0);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  // Calculated values
  const [increasePerSecond, setIncreasePerSecond] = useState<number>(2.5);
  
  // Simulate data changes for testing
  useEffect(() => {
    const interval = setInterval(() => {
      setPopulation(prev => prev + Math.floor(Math.random() * 10));
      setDebt(prev => prev + Math.floor(Math.random() * 100000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update LED status based on error count
  useEffect(() => {
    if (errorCount >= 3) {
      setLedStatus('error');
    } else if (errorCount >= 1) {
      setLedStatus('warning');
    } else {
      setLedStatus('neutral');
    }
  }, [errorCount]);
  
  // Reset errors
  const resetErrors = () => {
    setErrorCount(0);
    setErrorMessages([]);
    setLedStatus('neutral');
  };
  
  // Add a new error
  const addError = (message: string) => {
    setErrorCount(prev => prev + 1);
    setErrorMessages(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };
  
  // Context value
  const contextValue: AppContextState = {
    // Data values
    population,
    debt,
    activeDataType,
    isLoading,
    
    // Error handling
    ledStatus,
    errorCount,
    errorMessages,
    
    // Calculated values
    increasePerSecond,
    
    // Actions
    setActiveDataType,
    resetErrors,
    addError
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 