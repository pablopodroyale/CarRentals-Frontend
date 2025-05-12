import { Injectable, signal } from "@angular/core";
import { Rental } from "src/app/core/models/rental.model";
import { IndexedDbService } from "src/app/infraestructure/services/index-db/indexed-db.service";

@Injectable({ providedIn: 'root' })
export class RentalsStoreService {
  private rentalsSignal = signal<Rental[]>([]);
  rentals = this.rentalsSignal.asReadonly();

  constructor(private indexedDb: IndexedDbService) {}

  setRentals(rentals: Rental[]) {
    this.rentalsSignal.set(rentals);
    this.indexedDb.saveRentals(rentals); // guardar en IndexedDB
  }

  getRentalById(id: string): Rental | undefined {
    return this.rentalsSignal().find(r => r.id === id);
  }

  async loadFromIndexedDb() {
    const rentals = await this.indexedDb.getRentals();
    if (rentals) this.rentalsSignal.set(rentals);
  }
}
