/**
 * WorldometerAPI.ts
 * A TypeScript port of the Worldometer Python API
 * Based on: https://worldometer.readthedocs.io/en/latest/api/world.html
 */

/**
 * TypeScript port of the Python Worldometer API
 * Based on https://github.com/matheusfelipeog/worldometer
 * 
 * This implementation simulates the data that would be returned by the Python package,
 * which scrapes data from worldometers.info
 */

// World Population data structure
export interface WorldPopulation {
  currentPopulation: number;
  birthsToday: number;
  birthsThisYear: number;
  deathsToday: number;
  deathsThisYear: number;
  netPopulationGrowthToday: number;
  netPopulationGrowthThisYear: number;
}

// Government and Economics data structure
export interface GovernmentAndEconomics {
  publicHealthcareExpenditureToday: number;
  publicEducationExpenditureToday: number;
  publicMilitaryExpenditureToday: number;
  carsProducedThisYear: number;
  bicyclesProducedThisYear: number;
  computersProducedThisYear: number;
}

// Society and Media data structure
export interface SocietyAndMedia {
  newBookTitlesPublishedThisYear: number;
  newspapersCirculatedToday: number;
  tvSetsSoldWorldwideToday: number;
  cellularPhonesSoldToday: number;
  moneySpentOnVideogamesToday: number;
  internetUsersInTheWorldToday: number;
  emailsSentToday: number;
  blogPostsWrittenToday: number;
  tweetsSentToday: number;
  googleSearchesToday: number;
}

// Environment data structure
export interface Environment {
  forestLossThisYear: number;
  landLostToSoilErosionThisYear: number;
  co2EmissionsThisYear: number;
  desertificationThisYear: number;
  toxicChemicalsReleasedInTheEnvironmentThisYear: number;
}

// Food data structure
export interface Food {
  undernourishedPeopleInTheWorld: number;
  overweightPeopleInTheWorld: number;
  obesePeopleInTheWorld: number;
  peopleWhoDiedOfHungerToday: number;
  moneySpentForObesityRelatedDiseasesInTheUsaToday: number;
  moneySpentOnWeightLossProgramsInTheUsaToday: number;
}

// Water data structure
export interface Water {
  waterUsedThisYear: number;
  deathsCausedByWaterRelatedDiseasesThisYear: number;
  peopleWithNoAccessToASafeDrinkingWaterSource: number;
}

// Energy data structure
export interface Energy {
  energyUsedToday: number;
  nonRenewableSources: number;
  renewableSources: number;
  solarEnergyStrikingEarthToday: number;
  oilPumpedToday: number;
  oilLeft: number;
  daysToTheEndOfOil: number;
  naturalGasLeft: number;
  daysToTheEndOfNaturalGas: number;
  coalLeft: number;
  daysToTheEndOfCoal: number;
}

// Health data structure
export interface Health {
  communicableDiseaseDeathsThisYear: number;
  seasonalFluDeathsThisYear: number;
  deathsOfChildrenUnder5ThisYear: number;
  abortionsThisYear: number;
  deathsOfMothersDuringBirthThisYear: number;
  hivAidsInfectedPeople: number;
  deathsCausedByHivAidsThisYear: number;
  deathsCausedByCancerThisYear: number;
  deathsCausedByMalariaThisYear: number;
  cigarettesSmokesToday: number;
  deathsCausedBySmokingThisYear: number;
  deathsCausedByAlcoholThisYear: number;
  suicidesThisYear: number;
  moneySpentOnIllegalDrugsThisYear: number;
  roadTrafficAccidentFatalitiesThisYear: number;
}

// World Counters data structure
export interface WorldCounters {
  worldPopulation: WorldPopulation;
  governmentAndEconomics: GovernmentAndEconomics;
  societyAndMedia: SocietyAndMedia;
  environment: Environment;
  food: Food;
  water: Water;
  energy: Energy;
  health: Health;
}

// Country Codes data structure
export interface CountryCodesData {
  country: string;
  callingCode: string;
  threeLetterIso: string;
  twoLetterIso: string;
  threeDigitIsoNumeric: number;
}

/**
 * WorldometerAPI class - Main entry point for the API
 * Mimics the functionality of the Python worldometer package
 */
export class WorldometerAPI {
  private baseUrl: string = 'https://www.worldometers.info';
  private cachedCounters: WorldCounters | null = null;
  private lastFetchTime: number = 0;
  private cacheDuration: number = 60 * 1000; // 1 minute cache

  /**
   * Get world counters data
   * Equivalent to WorldCounters() in the Python API
   */
  public async getWorldCounters(): Promise<WorldCounters> {
    const now = Date.now();
    
    // Check if we have cached data that's still valid
    if (this.cachedCounters && (now - this.lastFetchTime) < this.cacheDuration) {
      return this.cachedCounters;
    }
    
    // Fetch new data
    const counters = await this.fetchAndParseWorldometersData();
    
    // Update cache
    this.cachedCounters = counters;
    this.lastFetchTime = now;
    
    return counters;
  }
  
  /**
   * Get country codes data
   * Equivalent to CountryCodes() in the Python API
   */
  public async getCountryCodes(): Promise<CountryCodesData[]> {
    // In a real implementation, this would fetch and parse data from worldometers.info
    // For now, we'll return a small sample of country codes
    return [
      {
        country: 'United States',
        callingCode: '+1',
        threeLetterIso: 'USA',
        twoLetterIso: 'US',
        threeDigitIsoNumeric: 840
      },
      {
        country: 'United Kingdom',
        callingCode: '+44',
        threeLetterIso: 'GBR',
        twoLetterIso: 'GB',
        threeDigitIsoNumeric: 826
      },
      {
        country: 'Germany',
        callingCode: '+49',
        threeLetterIso: 'DEU',
        twoLetterIso: 'DE',
        threeDigitIsoNumeric: 276
      }
    ];
  }
  
  /**
   * Reload data to get the latest
   * Equivalent to wc.reload_data() in the Python API
   */
  public async reloadData(): Promise<WorldCounters> {
    // Force a refresh by clearing the cache
    this.cachedCounters = null;
    this.lastFetchTime = 0;
    
    // Fetch new data
    return this.getWorldCounters();
  }
  
  /**
   * Fetch and parse data from worldometers.info
   * This simulates what the Python package does by scraping the website
   */
  private async fetchAndParseWorldometersData(): Promise<WorldCounters> {
    // In a real implementation, this would use fetch or axios to get the HTML
    // and then parse it to extract the counter values
    
    // For now, we'll generate simulated data that matches what you'd get from the website
    const basePopulation = 8065300000;
    const now = Date.now();
    const secondsToday = Math.floor((now % 86400000) / 1000);
    
    // Generate simulated data
    return {
      worldPopulation: {
        currentPopulation: basePopulation + Math.floor(Math.random() * 100000),
        birthsToday: Math.floor(secondsToday * 4.3),
        birthsThisYear: 73000000 + Math.floor(secondsToday * 4.3),
        deathsToday: Math.floor(secondsToday * 1.8),
        deathsThisYear: 42000000 + Math.floor(secondsToday * 1.8),
        netPopulationGrowthToday: Math.floor(secondsToday * 2.5),
        netPopulationGrowthThisYear: 31000000 + Math.floor(secondsToday * 2.5)
      },
      governmentAndEconomics: {
        publicHealthcareExpenditureToday: 18000000000 + Math.floor(Math.random() * 1000000),
        publicEducationExpenditureToday: 14000000000 + Math.floor(Math.random() * 1000000),
        publicMilitaryExpenditureToday: 5000000000 + Math.floor(Math.random() * 1000000),
        carsProducedThisYear: 45000000 + Math.floor(Math.random() * 100000),
        bicyclesProducedThisYear: 120000000 + Math.floor(Math.random() * 100000),
        computersProducedThisYear: 180000000 + Math.floor(Math.random() * 100000)
      },
      societyAndMedia: {
        newBookTitlesPublishedThisYear: 2200000 + Math.floor(Math.random() * 10000),
        newspapersCirculatedToday: 600000000 + Math.floor(Math.random() * 1000000),
        tvSetsSoldWorldwideToday: 400000 + Math.floor(Math.random() * 10000),
        cellularPhonesSoldToday: 4000000 + Math.floor(Math.random() * 100000),
        moneySpentOnVideogamesToday: 300000000 + Math.floor(Math.random() * 1000000),
        internetUsersInTheWorldToday: 5895000000 + Math.floor(Math.random() * 1000000),
        emailsSentToday: 300000000000 + Math.floor(Math.random() * 10000000),
        blogPostsWrittenToday: 4000000 + Math.floor(Math.random() * 100000),
        tweetsSentToday: 500000000 + Math.floor(Math.random() * 1000000),
        googleSearchesToday: 8500000000 + Math.floor(Math.random() * 10000000)
      },
      environment: {
        forestLossThisYear: 4000000 + Math.floor(Math.random() * 100000),
        landLostToSoilErosionThisYear: 5000000 + Math.floor(Math.random() * 100000),
        co2EmissionsThisYear: 25000000000 + Math.floor(Math.random() * 100000000),
        desertificationThisYear: 12000000 + Math.floor(Math.random() * 100000),
        toxicChemicalsReleasedInTheEnvironmentThisYear: 8000000 + Math.floor(Math.random() * 100000)
      },
      food: {
        undernourishedPeopleInTheWorld: 870000000 + Math.floor(Math.random() * 1000000),
        overweightPeopleInTheWorld: 1700000000 + Math.floor(Math.random() * 1000000),
        obesePeopleInTheWorld: 780000000 + Math.floor(Math.random() * 1000000),
        peopleWhoDiedOfHungerToday: 25000 + Math.floor(Math.random() * 1000),
        moneySpentForObesityRelatedDiseasesInTheUsaToday: 470000000 + Math.floor(Math.random() * 1000000),
        moneySpentOnWeightLossProgramsInTheUsaToday: 180000000 + Math.floor(Math.random() * 1000000)
      },
      water: {
        waterUsedThisYear: 3000000000000 + Math.floor(Math.random() * 10000000000),
        deathsCausedByWaterRelatedDiseasesThisYear: 850000 + Math.floor(Math.random() * 10000),
        peopleWithNoAccessToASafeDrinkingWaterSource: 780000000 + Math.floor(Math.random() * 1000000)
      },
      energy: {
        energyUsedToday: 1500000000 + Math.floor(Math.random() * 10000000),
        nonRenewableSources: 1200000000 + Math.floor(Math.random() * 10000000),
        renewableSources: 300000000 + Math.floor(Math.random() * 10000000),
        solarEnergyStrikingEarthToday: 50000000000 + Math.floor(Math.random() * 1000000000),
        oilPumpedToday: 95000000 + Math.floor(Math.random() * 1000000),
        oilLeft: 1500000000000 + Math.floor(Math.random() * 10000000000),
        daysToTheEndOfOil: 15000 + Math.floor(Math.random() * 100),
        naturalGasLeft: 1200000000000 + Math.floor(Math.random() * 10000000000),
        daysToTheEndOfNaturalGas: 18000 + Math.floor(Math.random() * 100),
        coalLeft: 4500000000000 + Math.floor(Math.random() * 10000000000),
        daysToTheEndOfCoal: 45000 + Math.floor(Math.random() * 100)
      },
      health: {
        communicableDiseaseDeathsThisYear: 9500000 + Math.floor(Math.random() * 100000),
        seasonalFluDeathsThisYear: 400000 + Math.floor(Math.random() * 10000),
        deathsOfChildrenUnder5ThisYear: 5000000 + Math.floor(Math.random() * 100000),
        abortionsThisYear: 28000000 + Math.floor(Math.random() * 100000),
        deathsOfMothersDuringBirthThisYear: 250000 + Math.floor(Math.random() * 10000),
        hivAidsInfectedPeople: 36000000 + Math.floor(Math.random() * 100000),
        deathsCausedByHivAidsThisYear: 1200000 + Math.floor(Math.random() * 10000),
        deathsCausedByCancerThisYear: 7000000 + Math.floor(Math.random() * 100000),
        deathsCausedByMalariaThisYear: 750000 + Math.floor(Math.random() * 10000),
        cigarettesSmokesToday: 18000000000 + Math.floor(Math.random() * 100000000),
        deathsCausedBySmokingThisYear: 4800000 + Math.floor(Math.random() * 100000),
        deathsCausedByAlcoholThisYear: 2200000 + Math.floor(Math.random() * 100000),
        suicidesThisYear: 850000 + Math.floor(Math.random() * 10000),
        moneySpentOnIllegalDrugsThisYear: 320000000000 + Math.floor(Math.random() * 1000000000),
        roadTrafficAccidentFatalitiesThisYear: 1200000 + Math.floor(Math.random() * 10000)
      }
    };
  }
}

// Create and export a singleton instance for easy use
export const worldometerAPI = new WorldometerAPI();
export default worldometerAPI; 