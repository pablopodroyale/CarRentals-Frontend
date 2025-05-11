import { Component, signal } from '@angular/core';
import { CarService } from '../../../infraestructure/services/car/car.service';
import { Car } from 'src/app/core/models/car.model';
import { CarFilterComponent } from './filter/car-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarFilterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  availableCars = signal<Car[]>([]);

  constructor(private carService: CarService) {}

  search(filters: any) {
    const payload = {
      ...filters,
      startDate: new Date(filters.startDate).toISOString(),
      endDate: new Date(filters.endDate).toISOString()
    };

    this.carService.getAvailableCars(payload).subscribe(result => {
      this.availableCars.set(result);
    });
  }
}
