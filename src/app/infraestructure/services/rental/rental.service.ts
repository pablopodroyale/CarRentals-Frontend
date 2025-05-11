import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { RegisterRentalRequest } from '../../../core/models/register-rental-request.model';
import { environment } from '../../../../environments/environment';
import { Rental } from 'src/app/core/models/rental.model';
import { mapRentalDtoToModel, mapRentalModelToDto } from 'src/app/core/mappers/rental.mapper';
import { RentalDto } from 'src/app/core/dtos/rental.dto';
import { ModifyRentalRequest } from '../../../core/dtos/rentals-request-update.dto';

@Injectable({ providedIn: 'root' })
export class RentalService {
  private readonly baseUrl = `${environment.apiUrl}/Rentals`;

  private rentalsCache: Rental[] = []; // útil para getRentalById sin llamadas extras

  constructor(private http: HttpClient) {}

  registerRental(payload: RegisterRentalRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, payload);
  }

  getAllRentals(customerId?: string): Observable<Rental[]> {
    const queryParams = {
      ...(customerId ? { customerID: customerId } : {})
    };

    return this.http.get<RentalDto[]>(`${this.baseUrl}`, { params: queryParams }).pipe(
      map(list => {
        const rentals = list.map(mapRentalDtoToModel);
        this.rentalsCache = rentals;
        return rentals;
      })
    );
  }

  getRentalById(id: string): Rental | undefined {
    return this.rentalsCache.find(r => r.id === id);
  }

  updateRental(payload: ModifyRentalRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${payload.rentalId}`, payload);
  }

  cancelRental(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Opcional: método mock para pruebas o fallback
  mockSetCache(rentals: Rental[]) {
    this.rentalsCache = rentals;
  }

  mockClearCache() {
    this.rentalsCache = [];
  }
}
