import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CarService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CarService] 
    });

    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
