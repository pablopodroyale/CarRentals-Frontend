import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRentalRequest } from '../../../core/models/register-rental-request.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RentalService {
  private readonly baseUrl = `${environment.apiUrl}/Rentals`;

  constructor(private http: HttpClient) {}

  registerRental(payload: RegisterRentalRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, payload);
  }

  // Para futuros incrementos:
  // getAllRentals(), cancelRental(), updateRental()...
}
