export interface ModifyRentalRequest {
  rentalId: string;
  newStartDate: string; // ISO
  newEndDate: string;   // ISO
  newCarType?: string;
  carId: string;
}
