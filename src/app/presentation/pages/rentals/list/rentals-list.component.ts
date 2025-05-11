import { Component, signal } from '@angular/core';
import { RentalService } from 'src/app/infraestructure/services/rental/rental.service';
import { Rental } from 'src/app/core/models/rental.model';
import { CommonModule } from '@angular/common';
import { IndexedDbService } from 'src/app/infraestructure/services/index-db/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rentals-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentals-list.component.html'
})
export class RentalsListComponent {
  rentals = signal<Rental[]>([]);
  customerId: string | undefined;

  constructor(private rentalService: RentalService, private indexedDbService: IndexedDbService, private router: Router) {
    this.customerId = undefined;
  }

  async ngOnInit() {
    this.customerId = await this.indexedDbService.getEmail();
    if (this.customerId) {
      this.rentalService.getAllRentals(this.customerId).subscribe({
        next: rentals => {
          this.rentals.set(rentals);
          this.indexedDbService.saveRentals(rentals); 
        },
        error: () => {
          // (opcional) fallback a IndexedDB
          this.indexedDbService.getRentals().then(cached => {
            this.rentals.set(cached);
          });
        }
      });
    }
  }
  
  editRental(id: string | undefined) {
    if (!id) return;
    this.router.navigate(['/rentals/edit', id]);
  }

  cancelRental(id: string | undefined) {
    if (!id) return;
  
    if (!confirm('Are you sure you want to cancel this rental?')) return;
  
    this.rentalService.cancelRental(id).subscribe({
      next: () => {
        const updated = this.rentals().map(r =>
          r.id === id ? { ...r, isCanceled: true } : r
        );
        this.rentals.set(updated);
        this.indexedDbService.saveRentals(updated); // opcional: actualizar IndexedDB
      },
      error: () => {
        alert('Error cancelling rental.');
      }
    });
  }
}
