import { TestBed } from '@angular/core/testing';
import { RentalService } from './rental.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RentalService', () => {
  let service: RentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RentalService]
    });
    service = TestBed.inject(RentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
