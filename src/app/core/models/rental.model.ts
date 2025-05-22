export interface Rental {
  id?: string;
  customer: {
    dni: string;
    fullName: string;
    address: string;
  };
  car: {
    id: string;
    type: string;
    model: string;
    location: string;
  };
  startDate: string; // ISO format
  endDate: string;
  isCanceled?: boolean; // Optional, default to false
  location?: string; 
}
