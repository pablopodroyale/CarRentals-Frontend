import { TestBed } from '@angular/core/testing';

import { RentalsStoreService } from './rentals-store.service';

describe('RentalStoreService', () => {
  let service: RentalsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
