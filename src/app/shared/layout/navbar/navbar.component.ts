import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../infraestructure/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Add any additional logic or properties needed for the navbar here
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
