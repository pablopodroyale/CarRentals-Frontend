import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly baseUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) { }


  getAvailableCars(params: {
    startDate: string | Date;
    endDate: string | Date;
    carType?: string;
    model?: string;
    location?: string;
  }): Observable<Car[]> {
    const queryParams = {
      startDate: new Date(params.startDate).toISOString(),
      endDate: new Date(params.endDate).toISOString(),
      ...(params.carType && { carType: params.carType }),
      ...(params.model && { model: params.model }),
      ...(params.location && { location: params.location })
    };
  
    return this.http.get<Car[]>(`${this.baseUrl}/available`, { params: queryParams });
  }
  
}
