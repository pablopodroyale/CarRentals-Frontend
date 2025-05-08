import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerService } from '../../../application/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.customerService.registerCustomer(this.form.value).subscribe({
        next: () => {
          this.successMessage = 'Success.';
          this.router.navigate(['/login']);
        },
        error: () => {
          this.errorMessage = 'Error. Try again.';
        }
      });
    }
  }
}
