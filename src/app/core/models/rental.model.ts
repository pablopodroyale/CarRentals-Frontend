export interface Rental {
  id?: string;
  customer: {
    dni: string;
    fullName: string;
    address: string;
  };
  car: {
    type: string;
    model: string;
    location: string;
  };
  startDate: string; // ISO format
  endDate: string;
}
