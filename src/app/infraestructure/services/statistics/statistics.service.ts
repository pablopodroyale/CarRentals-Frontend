import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  MostRentedCarDto,
  MostUsedGroupDto,
  UtilizationDto,
  DailySummaryDto
} from '../../../core/models/statistics/statistics.model'; // ajustá el path

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private baseUrl = `${environment.apiUrl}/statistics`;

  constructor(private http: HttpClient) {}

  getMostRented(from: string, to: string): Observable<MostRentedCarDto[]> {
    return this.http.get<MostRentedCarDto[]>(`${this.baseUrl}/most-rented`, {
      params: { from, to }
    });
  }

  getMostUsedByGroup(from: string, to: string): Observable<MostUsedGroupDto[]> {
    return this.http.get<MostUsedGroupDto[]>(`${this.baseUrl}/most-used-by-group`, {
      params: { from, to }
    });
  }

  getUtilization(from: string, to: string): Observable<UtilizationDto[]> {
    return this.http.get<UtilizationDto[]>(`${this.baseUrl}/utilization`, {
      params: { from, to }
    });
  }

  getDailySummary(days: number): Observable<DailySummaryDto[]> {
    return this.http.get<DailySummaryDto[]>(`${this.baseUrl}/daily-summary`, {
      params: { days: days.toString() }
    });
  }
}
