import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RentalService } from 'src/app/infraestructure/services/rental/rental.service';
import { IndexedDbService } from '../../../../infraestructure/services/index-db/indexed-db.service'; // Asegúrate de tener este servicio creado
import { Rental } from 'src/app/core/models/rental.model';

@Component({
  selector: 'app-edit-rental',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './rentals-edit.component.html',
})
export class RentalsEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private rentalService = inject(RentalService);
  private router = inject(Router);
  private indexedDb = inject(IndexedDbService); // Servicio separado

  form = this.fb.group({
    newStartDate: ['', Validators.required],
    newEndDate: ['', Validators.required],
    newCarType: ['', Validators.required],
    newCarModel: ['', Validators.required],
  });

  rentalId = '';
  existingCarId = '';
  error = '';
  confirmation = '';

  ngOnInit() {
    this.rentalId = this.route.snapshot.paramMap.get('id') || '';
  
    // Intentar primero obtener de IndexedDB
    this.indexedDb.getRentalById(this.rentalId).then(localRental => {
      if (localRental) {
        this.fillForm(localRental);
      } else {
        // Si no está en IndexedDB, cargar desde API
        this.rentalService.getAllRentals().subscribe({
          next: rentals => {
            const found = rentals.find(r => r.id === this.rentalId);
            if (found) {
              this.fillForm(found);
              this.indexedDb.saveRentals(rentals); // opcional: actualizar IndexedDB
            } else {
              this.error = 'Rental not found.';
            }
          },
          error: () => {
            this.error = 'Error loading rental.';
          }
        });
      }
    });
  }
  

  fillForm(rental: Rental) {
    if (!rental.car?.id) {
      this.error = 'Invalid rental data: missing car ID';
      return;
    }
  
    this.existingCarId = rental.car.id;
  
    this.form.patchValue({
      newStartDate: rental.startDate?.split('T')[0],
      newEndDate: rental.endDate?.split('T')[0],
      newCarType: rental.car?.type || '',
      newCarModel: rental.car?.model || '',
    });
  }

  submit() {
    this.error = '';
    this.confirmation = '';

    if (this.form.invalid) {
      this.error = 'Please complete all fields.';
      return;
    }

    const payload = {
      rentalId: this.rentalId,
      newStartDate: new Date(this.form.value.newStartDate!).toISOString(),
      newEndDate: new Date(this.form.value.newEndDate!).toISOString(),
      newCarType: this.form.value.newCarType!,
      carId: this.existingCarId
    };

    this.rentalService.updateRental(payload).subscribe({
      next: () => {
        this.confirmation = 'Rental updated successfully.';
        this.router.navigate(['/rentals/list']);
      },
      error: (error) => {
        this.error = 'Error updating rental. ' + error.error.error;
      }
    });
  }
}
