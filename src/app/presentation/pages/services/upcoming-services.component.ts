import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../infraestructure/services/car/car.service';
import { UpcomingServiceDto } from 'src/app/core/models/car/upcoming-service.model';

@Component({
  selector: 'app-upcoming-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-services.component.html',
})
export class UpcomingServicesComponent implements OnInit {
  upcomingServices: UpcomingServiceDto[] = [];
  isLoading = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.carService.getUpcomingServices().subscribe({
      next: data => {
        this.upcomingServices = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading upcoming services:', err);
        this.upcomingServices = [];
        this.isLoading = false;
      }
    });
  }
}
