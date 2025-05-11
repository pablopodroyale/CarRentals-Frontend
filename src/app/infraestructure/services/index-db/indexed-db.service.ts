import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Rental } from 'src/app/core/models/rental.model';

@Injectable({ providedIn: 'root' })
export class IndexedDbService { 
  private dbPromise = openDB('CarRentalDB', 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('rentals')) {
        db.createObjectStore('rentals', { keyPath: 'id' }); // usa el id del rental
      }
    }
  });

  // USER EMAIL ====================
  async saveEmail(email: string): Promise<void> {
    const db = await this.dbPromise;
    await db.put('users', { id: 'current', email });
  }

  async getEmail(): Promise<string | undefined> {
    const db = await this.dbPromise;
    const result = await db.get('users', 'current');
    return result?.email;
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear('users');
    await db.clear('rentals');
  }

  // RENTALS =======================
  async saveRentals(rentals: Rental[]): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('rentals', 'readwrite');
    const store = tx.objectStore('rentals');
    await store.clear(); // opcional: limpiar antes
    for (const rental of rentals) {
      await store.put(rental);
    }
    await tx.done;
  }

  async getRentals(): Promise<Rental[]> {
    const db = await this.dbPromise;
    return await db.getAll('rentals');
  }

  // Obtener un rental por ID
  async getRentalById(id: string): Promise<Rental | undefined> {
    const db = await this.dbPromise;
    return await db.get('rentals', id);
  }

  // Actualizar un rental específico (por ID)
  async updateRental(rental: Rental): Promise<void> {
    const db = await this.dbPromise;
    await db.put('rentals', rental);
  }

  // Eliminar un rental por ID
  async deleteRental(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('rentals', id);
  }
}
