import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbPromise = openDB('CarRentalDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
    }
  });

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
  }
}
