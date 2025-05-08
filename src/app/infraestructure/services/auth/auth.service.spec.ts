import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../../../core/models/login-request.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear(); // Limpia para evitar interferencias
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login endpoint and store token in localStorage', () => {
    const mockRequest: LoginRequest = {
      email: 'user@example.com',
      password: 'Password123'
    };

    const mockResponse = {
      token: 'mock-token-123',
      expiration: '2025-12-31T23:59:59Z'
    };

    service.login(mockRequest).subscribe(res => {
      expect(res.token).toBe('mock-token-123');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);

    req.flush(mockResponse);

    expect(localStorage.getItem('token')).toBe('mock-token-123');
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('token', 'saved-token');
    expect(service.getToken()).toBe('saved-token');
  });

  it('should remove token on logout', () => {
    localStorage.setItem('token', 'saved-token');
    localStorage.setItem('token_expiration', 'some-date');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token_expiration')).toBeNull();
  });

  it('should return true if token exists (isLoggedIn)', () => {
    localStorage.setItem('token', 'abc');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if token is not present (isLoggedIn)', () => {
    localStorage.removeItem('token');
    expect(service.isLoggedIn()).toBeFalse();
  });
});
