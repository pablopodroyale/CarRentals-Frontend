export interface RegisterRentalRequest {
    customerId: string;
    carType: string;
    model: string;
    startDate: string; // ISO 8601 format (e.g., '2025-05-10T00:00:00')
    endDate: string;
    location: string;
  }
  