import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../infraestructure/services/auth/auth.service';
import { IndexedDbService } from '../../../infraestructure/services/index-db/indexed-db.service'; // ← importar el servicio de IndexedDB

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ← necesario para routerLink
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private indexedDbService: IndexedDbService // ← inyectar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(this.form.value).subscribe({
        next: async () => {
          await this.indexedDbService.saveEmail(email); // ✅ guardar en IndexedDB
          this.router.navigate(['/home'])
        } ,
        error: () => this.error = 'Invalid credentials. Please try again.',
      });
    }
    else{
      this.form.markAllAsTouched();
    }
  }

  saveEmailToIndexedDB(email: string) {
    const request = indexedDB.open('CarRentalDB', 1);
  
    request.onupgradeneeded = event => {
      const db = request.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
    };
  
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      store.put({ id: 'current', email });
    };
  
    request.onerror = () => {
      console.error('❌ Error opening IndexedDB');
    };
  }
  
}
