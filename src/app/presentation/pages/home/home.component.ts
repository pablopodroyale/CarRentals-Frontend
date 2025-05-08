import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from 'src/app/core/models/car.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  cars = signal<Car[]>([]);

  constructor() {
  }

  // Lógica para cargar autos disponibles más adelante
  ngOnInit() {
    // Simulación de carga de autos
    const loadedCars: Car[] = [
      {
        id: '1',
        type: 'SUV',
        model: 'Toyota RAV4',
        location: 'Ezeiza',
        services: [{ date: new Date('2025-05-20') }],
      },
      {
        id: '2',
        type: 'Sedan',
        model: 'Honda Civic',
        location: 'Aeroparque',
        services: [{ date: new Date('2025-06-15') }],
      },
    ];

    this.cars.set(loadedCars);
  }
}
