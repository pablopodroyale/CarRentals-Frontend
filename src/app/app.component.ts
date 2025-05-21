import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './application/services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
   
}
