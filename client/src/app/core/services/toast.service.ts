import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private addToast(type: Toast['type'], message: string, duration: number = 5000) {
    const toast: Toast = {
      id: this.generateId(),
      type,
      message,
      duration
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto remove toast after duration
    setTimeout(() => {
      this.removeToast(toast.id);
    }, duration);
  }

  success(message: string, duration: number = 4000) {
    this.addToast('success', message, duration);
  }

  error(message: string, duration: number = 6000) {
    this.addToast('error', message, duration);
  }

  warning(message: string, duration: number = 5000) {
    this.addToast('warning', message, duration);
  }

  info(message: string, duration: number = 4000) {
    this.addToast('info', message, duration);
  }

  removeToast(id: string) {
    const currentToasts = this.toastsSubject.value;
    const filteredToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(filteredToasts);
  }

  clearAll() {
    this.toastsSubject.next([]);
  }
}
