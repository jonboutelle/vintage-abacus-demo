import React, { useEffect, useState } from 'react';
import { DataFetcher, FetchError } from '../services/dataFetcher';
import { DataType } from './DataToggle';

/**
 * Component to test and visualize the DataFetcher service
 */
const DataFetcherTest: React.FC = () => {
  // State for test results
  const [logs, setLogs] = useState<string[]>([]);
  const [dataType, setDataType] = useState<DataType>('population');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [increaseRate, setIncreaseRate] = useState<number>(0);
  const [errors, setErrors] = useState<FetchError[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Reference to the data fetcher
  const [dataFetcher, setDataFetcher] = useState<DataFetcher | null>(null);
  
  // Initialize data fetcher
  useEffect(() => {
    const onDataUpdate = (value: number) => {
      setCurrentValue(value);
      addLog(`Data updated: ${value.toLocaleString()}`);
    };
    
    const onError = (error: FetchError) => {
      setErrors(prev => [...prev, error]);
      addLog(`Error: ${error.message} (${error.endpoint})`);
    };
    
    const onIncreaseCalculated = (rate: number) => {
      setIncreaseRate(rate);
      addLog(`Increase rate: ${rate.toFixed(2)} per second`);
    };
    
    const fetcher = new DataFetcher(onDataUpdate, onError, onIncreaseCalculated);
    setDataFetcher(fetcher);
    
    return () => {
      if (fetcher) {
        fetcher.stop();
      }
    };
  }, []);
  
  // Add a log message
  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 99)]);
  };
  
  // Start the data fetcher
  const handleStart = () => {
    if (dataFetcher && !isRunning) {
      setStartTime(Date.now());
      dataFetcher.start(dataType);
      setIsRunning(true);
      addLog(`Started fetching ${dataType} data`);
    }
  };
  
  // Stop the data fetcher
  const handleStop = () => {
    if (dataFetcher && isRunning) {
      dataFetcher.stop();
      setIsRunning(false);
      addLog('Stopped fetching data');
    }
  };
  
  // Toggle data type
  const handleToggleDataType = () => {
    const newType = dataType === 'population' ? 'debt' : 'population';
    setDataType(newType);
    
    if (dataFetcher && isRunning) {
      dataFetcher.setDataType(newType);
      addLog(`Switched to ${newType} data`);
    }
  };
  
  // Simulate an error
  const handleSimulateError = () => {
    addLog('Simulating API error...');
    const error: FetchError = {
      message: 'Simulated API error for testing',
      timestamp: new Date().toISOString(),
      endpoint: dataType
    };
    
    if (dataFetcher) {
      // Access the onError callback directly
      const onErrorMethod = (dataFetcher as any).onError;
      if (onErrorMethod) {
        onErrorMethod(error);
      }
    }
  };
  
  // Calculate elapsed time
  const getElapsedTime = (): string => {
    if (!startTime) return '0s';
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    if (elapsed < 60) {
      return `${elapsed}s`;
    } else if (elapsed < 3600) {
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      return `${minutes}m ${seconds}s`;
    } else {
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };
  
  // Clear logs
  const handleClearLogs = () => {
    setLogs([]);
    addLog('Logs cleared');
  };
  
  return (
    <div className="p-4 bg-amber-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-amber-900 mb-4">Data Fetcher Service Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Control Panel */}
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-bold text-amber-800 mb-2">Controls</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className={`px-3 py-1 rounded text-sm font-medium ${
                isRunning 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Start Fetching
            </button>
            
            <button
              onClick={handleStop}
              disabled={!isRunning}
              className={`px-3 py-1 rounded text-sm font-medium ${
                !isRunning 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              Stop Fetching
            </button>
            
            <button
              onClick={handleToggleDataType}
              className="px-3 py-1 rounded text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200"
            >
              Toggle Data Type
            </button>
            
            <button
              onClick={handleSimulateError}
              className="px-3 py-1 rounded text-sm font-medium bg-orange-100 text-orange-800 hover:bg-orange-200"
            >
              Simulate Error
            </button>
            
            <button
              onClick={handleClearLogs}
              className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              Clear Logs
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">Status</div>
              <div className="font-medium">
                {isRunning ? (
                  <span className="text-green-600">Running</span>
                ) : (
                  <span className="text-gray-600">Stopped</span>
                )}
              </div>
            </div>
            
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">Data Type</div>
              <div className="font-medium capitalize">{dataType}</div>
            </div>
            
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">Elapsed Time</div>
              <div className="font-medium">{getElapsedTime()}</div>
            </div>
            
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">Error Count</div>
              <div className="font-medium">{errors.length}</div>
            </div>
          </div>
        </div>
        
        {/* Current Data */}
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-bold text-amber-800 mb-2">Current Data</h3>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">
                {dataType === 'population' ? 'World Population' : 'U.S. National Debt'}
              </div>
              <div className="font-medium text-lg">
                {currentValue !== null ? currentValue.toLocaleString() : 'No data'}
              </div>
            </div>
            
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">Increase Rate</div>
              <div className="font-medium">
                {increaseRate.toFixed(2)} per second
                {dataType === 'population' 
                  ? ' (people)' 
                  : ' ($)'}
              </div>
            </div>
            
            <div className="bg-amber-50 p-2 rounded">
              <div className="text-xs text-amber-700">Next Fetch In</div>
              <div className="font-medium">
                {isRunning 
                  ? 'Calculating...' 
                  : 'Not running'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logs */}
      <div className="bg-white p-3 rounded shadow">
        <h3 className="font-bold text-amber-800 mb-2">Activity Logs</h3>
        
        <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded text-sm font-mono">
          {logs.length === 0 ? (
            <div className="text-gray-500 italic">No logs yet. Start the data fetcher to see activity.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        This component is used to test and validate the DataFetcher service.
      </div>
    </div>
  );
};

export default DataFetcherTest; 