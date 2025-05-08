  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
  import { RentalService } from '../../../infraestructure/services/rental/rental.service';
  import { RegisterRentalRequest } from 'src/app/core/models/register-rental-request.model';

  @Component({
    selector: 'app-register-rental',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './rentals-register.component.html',
  })
  export class RegisterRentalComponent {
    form: FormGroup;
    confirmationMessage = '';
    errorMessage = '';

    constructor(private fb: FormBuilder, private rentalService: RentalService) {
      this.form = this.fb.group({
        customerId: ['', Validators.required],
        carType: ['', Validators.required],
        model: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
    }

    submit() {
      this.errorMessage = '';
      this.confirmationMessage = '';
    
      if (this.form.invalid) {
        this.errorMessage = 'Please complete all required fields.';
        return;
      }
    
      const raw = this.form.value;
      const start = new Date(raw.startDate);
      const end = new Date(raw.endDate);
    
      if (start >= end) {
        this.errorMessage = 'Start date must be before end date.';
        return;
      }
    
      const payload: RegisterRentalRequest = {
        customerId: raw.customerId,
        carType: raw.carType,
        model: raw.model,
        startDate: start.toISOString(),
        endDate: end.toISOString()
      };
    
      this.rentalService.registerRental(payload).subscribe({
        next: () => {
          this.confirmationMessage = `Rental confirmed.`;
          this.form.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.error || 'Error. Try again.';
        }
      });
    }
    
  }
