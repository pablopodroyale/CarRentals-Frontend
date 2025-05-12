export interface MostRentedCarDto {
    type: string;
    model: string;
    timesRented: number;
  }
  
  export interface MostUsedGroupDto {
    type: string;
    model: string;
    timesRented: number;
  }
  
  export interface UtilizationDto {
    type: string;
    percentageUsed: number;
  }
  
  export interface DailySummaryDto {
    date: string;
    rentals: number;
    cancellations: number;
    unusedCars: number;
  }


  