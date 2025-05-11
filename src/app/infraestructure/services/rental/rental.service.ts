import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RegisterRentalRequest } from '../../../core/models/register-rental-request.model';
import { environment } from '../../../../environments/environment';
import { Rental } from 'src/app/core/models/rental.model';
import { mapRentalDtoToModel, mapRentalModelToDto } from 'src/app/core/mappers/rental.mapper';
import { RentalDto } from 'src/app/core/dtos/rental.dto';

@Injectable({ providedIn: 'root' })
export class RentalService {
  private readonly baseUrl = `${environment.apiUrl}/Rentals`;

  constructor(private http: HttpClient) {}

  registerRental(payload: RegisterRentalRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, payload);
  }

  getAllRentals(customerId?: string): Observable<Rental[]> {
    const queryParams = {
      ...(customerId ? { customerID: customerId } : {})  // El parámetro esperado por el backend es "customerID"
    };
  
    return this.http.get<RentalDto[]>(`${this.baseUrl}`, { params: queryParams }).pipe(
      map(list => list.map(mapRentalDtoToModel))
    );
  }
  
  // Para futuros incrementos:
  // getAllRentals(), cancelRental(), updateRental()...
}
