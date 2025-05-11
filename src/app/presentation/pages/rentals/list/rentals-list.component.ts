import { Component, signal } from '@angular/core';
import { RentalService } from 'src/app/infraestructure/services/rental/rental.service';
import { Rental } from 'src/app/core/models/rental.model';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from 'src/app/infraestructure/services/index-db/indexed-db.service';

@Component({
  selector: 'app-rentals-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentals-list.component.html'
})
export class RentalsListComponent {
  rentals = signal<Rental[]>([]);
  customerId: string | undefined;

  constructor(private rentalService: RentalService, private indexedDbService: IndexedDbService) {
  }

  async ngOnInit() {
    this.customerId = await this.indexedDbService.getEmail();
    if (this.customerId) {
      this.rentalService.getAllRentals(this.customerId)
                        .subscribe(res => this.rentals.set(res));
    }
  }
}
