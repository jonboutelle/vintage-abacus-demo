import React, { useEffect, useState } from 'react';
import worldometerAPI, { WorldCounters } from '../services/WorldometerAPI';

const WorldometerTest: React.FC = () => {
  const [counters, setCounters] = useState<WorldCounters | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await worldometerAPI.getWorldCounters();
        setCounters(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Worldometer data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading && !counters) {
    return <div className="p-4 text-center">Loading Worldometer data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  if (!counters) {
    return <div className="p-4 text-center">No data available</div>;
  }

  return (
    <div className="p-4 bg-amber-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-amber-900 mb-4">Worldometer API Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-bold text-amber-800 mb-2">World Population</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Current Population:</span> {counters.worldPopulation.currentPopulation.toLocaleString()}</li>
            <li><span className="font-medium">Births Today:</span> {counters.worldPopulation.birthsToday.toLocaleString()}</li>
            <li><span className="font-medium">Deaths Today:</span> {counters.worldPopulation.deathsToday.toLocaleString()}</li>
            <li><span className="font-medium">Net Growth Today:</span> {counters.worldPopulation.netPopulationGrowthToday.toLocaleString()}</li>
          </ul>
        </div>
        
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-bold text-amber-800 mb-2">Society & Media</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Internet Users:</span> {counters.societyAndMedia.internetUsersInTheWorldToday.toLocaleString()}</li>
            <li><span className="font-medium">Emails Sent Today:</span> {counters.societyAndMedia.emailsSentToday.toLocaleString()}</li>
            <li><span className="font-medium">Google Searches Today:</span> {counters.societyAndMedia.googleSearchesToday.toLocaleString()}</li>
          </ul>
        </div>
        
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-bold text-amber-800 mb-2">Environment</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">CO2 Emissions This Year:</span> {counters.environment.co2EmissionsThisYear.toLocaleString()} tons</li>
            <li><span className="font-medium">Forest Loss This Year:</span> {counters.environment.forestLossThisYear.toLocaleString()} hectares</li>
          </ul>
        </div>
        
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-bold text-amber-800 mb-2">Energy</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="font-medium">Oil Pumped Today:</span> {counters.energy.oilPumpedToday.toLocaleString()} barrels</li>
            <li><span className="font-medium">Days to End of Oil:</span> {counters.energy.daysToTheEndOfOil.toLocaleString()}</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Data refreshes every 5 seconds. Last update: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default WorldometerTest; 