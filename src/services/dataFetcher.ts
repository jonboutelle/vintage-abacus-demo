import { DataType } from '../components/DataToggle';
import worldometerAPI from './WorldometerAPI';

// API endpoints (these would be real endpoints in a production app)
// Note: In a production environment, we would create a Python backend service that uses the
// worldometer Python package (https://worldometer.readthedocs.io/en/latest/api/world.html)
// and exposes REST API endpoints for our frontend to consume.
const API_ENDPOINTS = {
  population: 'https://api.worldometers.info/world-population', // Simulated endpoint
  debt: 'https://api.worldometers.info/us-debt', // Simulated endpoint
};

// Types for API responses
interface PopulationResponse {
  population: number;
  timestamp: string;
}

interface DebtResponse {
  debt: number;
  timestamp: string;
}

// Error handling types
export interface FetchError {
  message: string;
  timestamp: string;
  endpoint: string;
}

// Callback types
type DataCallback = (value: number) => void;
type ErrorCallback = (error: FetchError) => void;
type IncreaseCallback = (increasePerSecond: number) => void;

/**
 * DataFetcher class handles fetching data from the Worldometer API
 * with progressive intervals and error handling
 * 
 * This implementation uses our TypeScript port of the Worldometer API
 */
export class DataFetcher {
  private activeDataType: DataType = 'population';
  private fetchTimer: number | null = null;
  private startTime: number = Date.now();
  private errorCount: number = 0;
  private lastValue: number | null = null;
  private lastFetchTime: number | null = null;
  private onDataUpdate: DataCallback | null = null;
  private onError: ErrorCallback | null = null;
  private onIncreaseCalculated: IncreaseCallback | null = null;
  private isActive: boolean = false;

  /**
   * Initialize the data fetcher with callback functions
   */
  constructor(
    onDataUpdate: DataCallback,
    onError: ErrorCallback,
    onIncreaseCalculated: IncreaseCallback
  ) {
    this.onDataUpdate = onDataUpdate;
    this.onError = onError;
    this.onIncreaseCalculated = onIncreaseCalculated;
  }

  /**
   * Start fetching data with progressive intervals
   */
  public start(initialDataType: DataType = 'population'): void {
    this.activeDataType = initialDataType;
    this.startTime = Date.now();
    this.isActive = true;
    this.scheduleNextFetch();
  }

  /**
   * Stop fetching data
   */
  public stop(): void {
    this.isActive = false;
    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer);
      this.fetchTimer = null;
    }
  }

  /**
   * Change the data type being fetched
   */
  public setDataType(dataType: DataType): void {
    this.activeDataType = dataType;
    // Fetch immediately when data type changes
    this.fetchData();
  }

  /**
   * Calculate the next fetch interval based on elapsed time
   */
  private getNextFetchInterval(): number {
    const elapsedSeconds = (Date.now() - this.startTime) / 1000;
    
    // Progressive schedule:
    // - Every second initially
    if (elapsedSeconds < 15) {
      return 1000; // 1 second
    }
    // - Every 5 seconds for the first 15 seconds
    else if (elapsedSeconds < 5 * 60) {
      return 5 * 1000; // 5 seconds
    }
    // - Once per minute for the first 5 minutes
    else if (elapsedSeconds < 60 * 60) {
      return 60 * 1000; // 1 minute
    }
    // - Once every 15 minutes for the next hour
    else if (elapsedSeconds < 5 * 60 * 60) {
      return 15 * 60 * 1000; // 15 minutes
    }
    // - Once every hour thereafter
    else {
      return 60 * 60 * 1000; // 1 hour
    }
  }

  /**
   * Schedule the next data fetch based on the progressive interval
   */
  private scheduleNextFetch(): void {
    if (!this.isActive) return;
    
    const interval = this.getNextFetchInterval();
    
    this.fetchTimer = window.setTimeout(() => {
      this.fetchData();
    }, interval) as unknown as number;
  }

  /**
   * Fetch data from the Worldometer API
   */
  private async fetchData(): Promise<void> {
    if (!this.isActive) return;
    
    const currentTime = Date.now();
    
    try {
      // Fetch data from our TypeScript port of the Worldometer API
      const counters = await worldometerAPI.getWorldCounters();
      
      // Reset error count on successful fetch
      this.errorCount = 0;
      
      // Process the data based on data type
      let newValue: number;
      if (this.activeDataType === 'population') {
        newValue = counters.worldPopulation.currentPopulation;
      } else {
        // Note: The Worldometer API doesn't have US debt data
        // For debt, we'll continue to use simulated data
        newValue = 34_000_000_000_000 + Math.floor(Math.random() * 10_000_000);
      }
      
      // Calculate increase per second if we have previous values
      if (this.lastValue !== null && this.lastFetchTime !== null) {
        const valueDifference = newValue - this.lastValue;
        const timeDifference = (currentTime - this.lastFetchTime) / 1000; // in seconds
        const increasePerSecond = valueDifference / timeDifference;
        
        if (this.onIncreaseCalculated) {
          this.onIncreaseCalculated(increasePerSecond);
        }
      }
      
      // Update last values
      this.lastValue = newValue;
      this.lastFetchTime = currentTime;
      
      // Call the data update callback
      if (this.onDataUpdate) {
        this.onDataUpdate(newValue);
      }
    } catch (error) {
      // Increment error count
      this.errorCount++;
      
      // Create error object
      const fetchError: FetchError = {
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        endpoint: this.activeDataType
      };
      
      // Call the error callback
      if (this.onError) {
        this.onError(fetchError);
      }
    }
    
    // Schedule the next fetch
    this.scheduleNextFetch();
  }
}

// Create and export a singleton instance
export default DataFetcher; 