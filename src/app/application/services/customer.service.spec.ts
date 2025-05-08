import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { RegisterRequest } from '../../core/models/register-request.model';
import { environment } from '../../../environments/environment';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST register request to correct URL', () => {
    const mockRequest: RegisterRequest = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'Secure123!',
      address: '123 Main St'
    };

    service.registerCustomer(mockRequest).subscribe(response => {
      expect(response).toBe('user-id-123');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/customers`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);

    req.flush('user-id-123');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
