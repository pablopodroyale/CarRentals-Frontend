// src/app/shared/services/loading.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = signal(false);
  private requests = 0;

  show() {
    console.log('[LoadingService] show');
    this.requests++;
    this.loading.set(true);
  }

  hide() {
    console.log('[LoadingService] hide');
    this.requests = Math.max(this.requests - 1, 0);
    if (this.requests === 0) this.loading.set(false);
  }

  isLoading() {
    return this.loading;
  }
}
