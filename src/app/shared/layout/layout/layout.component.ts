import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from 'src/app/infraestructure/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/application/services/loading/loading.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private loadingService = inject(LoadingService);
  loading = this.loadingService.loading;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadingService.hide();
      });
  }

}
