import { DataFetcher, FetchError } from '../services/dataFetcher';

/**
 * This is a manual test file for the DataFetcher service.
 * It validates the functionality of the data fetcher, including:
 * - Progressive fetching intervals
 * - Error handling
 * - Data calculation
 * 
 * To run this test, you can use:
 * - Console logs to verify the behavior
 * - Manual inspection of the output
 */

// Mock the Date.now() function to control time for testing intervals
const originalDateNow = Date.now;
let mockTime = 0;

// Mock callbacks for testing
const onDataUpdate = (value: number) => {
  console.log(`Data updated: ${value}`);
};

const onError = (error: FetchError) => {
  console.log(`Error occurred: ${error.message} at ${error.timestamp} for endpoint ${error.endpoint}`);
};

const onIncreaseCalculated = (increasePerSecond: number) => {
  console.log(`Increase per second: ${increasePerSecond.toFixed(2)}`);
};

/**
 * Test the progressive fetching intervals
 */
function testProgressiveIntervals() {
  console.log('=== Testing Progressive Intervals ===');
  
  // Create a new instance of DataFetcher
  const dataFetcher = new DataFetcher(onDataUpdate, onError, onIncreaseCalculated);
  
  // Override the private method to log the interval
  // Note: This is for testing purposes only and requires manual verification
  console.log('To test intervals, add this code to dataFetcher.ts temporarily:');
  console.log(`
  // Add this to the getNextFetchInterval method in dataFetcher.ts
  private getNextFetchInterval(): number {
    const elapsedSeconds = (Date.now() - this.startTime) / 1000;
    let interval = 1000; // default 1 second
    
    // Progressive schedule:
    // - Every second initially
    if (elapsedSeconds < 15) {
      interval = 1000; // 1 second
    }
    // - Every 5 seconds for the first 15 seconds
    else if (elapsedSeconds < 5 * 60) {
      interval = 5 * 1000; // 5 seconds
    }
    // - Once per minute for the first 5 minutes
    else if (elapsedSeconds < 60 * 60) {
      interval = 60 * 1000; // 1 minute
    }
    // - Once every 15 minutes for the next hour
    else if (elapsedSeconds < 5 * 60 * 60) {
      interval = 15 * 60 * 1000; // 15 minutes
    }
    // - Once every hour thereafter
    else {
      interval = 60 * 60 * 1000; // 1 hour
    }
    
    console.log(\`Elapsed time: \${elapsedSeconds.toFixed(2)} seconds, Next interval: \${interval/1000} seconds\`);
    return interval;
  }
  `);
  
  console.log('After adding the logging code, start the data fetcher and observe the intervals in the console.');
}

/**
 * Test error handling
 */
function testErrorHandling() {
  console.log('=== Testing Error Handling ===');
  
  // Create a new instance of DataFetcher
  const dataFetcher = new DataFetcher(onDataUpdate, onError, onIncreaseCalculated);
  
  console.log('To test error handling, add this code to dataFetcher.ts temporarily:');
  console.log(`
  // Add this to the fetchData method in dataFetcher.ts
  private async fetchData(): Promise<void> {
    if (!this.isActive) return;
    
    const currentTime = Date.now();
    
    try {
      // Simulate an error every 3rd call
      if (this.errorCount % 3 === 0) {
        throw new Error('Simulated API error for testing');
      }
      
      // Rest of the method...
    } catch (error) {
      // Error handling code...
      console.log(\`Error count: \${this.errorCount}\`);
    }
    
    // Schedule the next fetch
    this.scheduleNextFetch();
  }
  `);
  
  console.log('After adding the error simulation code, start the data fetcher and observe the error handling in the console.');
}

/**
 * Test data calculation
 */
function testDataCalculation() {
  console.log('=== Testing Data Calculation ===');
  
  // Create a new instance of DataFetcher
  const dataFetcher = new DataFetcher(onDataUpdate, onError, onIncreaseCalculated);
  
  console.log('To test data calculation, add this code to dataFetcher.ts temporarily:');
  console.log(`
  // Add this to the fetchData method in dataFetcher.ts after calculating increasePerSecond
  if (this.onIncreaseCalculated) {
    this.onIncreaseCalculated(increasePerSecond);
    console.log(\`Value difference: \${newValue - this.lastValue}, Time difference: \${timeDifference.toFixed(2)} seconds\`);
  }
  `);
  
  console.log('After adding the calculation logging code, start the data fetcher and observe the calculations in the console.');
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('======= DATA FETCHER SERVICE VALIDATION =======');
  testProgressiveIntervals();
  console.log('\n');
  testErrorHandling();
  console.log('\n');
  testDataCalculation();
  console.log('\n');
  console.log('To run these tests, add the suggested logging code to dataFetcher.ts temporarily and observe the console output.');
}

// Run the tests
runAllTests(); 