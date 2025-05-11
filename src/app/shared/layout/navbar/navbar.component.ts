import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../infraestructure/services/auth/auth.service';
import { CommonModule } from '@angular/common'; // 👈 agregar esto

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isHovering = false;
  private authService = inject(AuthService);
  isAdmin: boolean;
  constructor(private router: Router) {
    this.isAdmin = false;
  }

  ngOnInit(){
    this.isAdmin = this.authService.getRole() === 'Admin';
  }

  // Add any additional logic or properties needed for the navbar here
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
