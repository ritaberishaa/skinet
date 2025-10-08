import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIcon],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts$ | async; track toast.id) {
        <div 
          class="toast toast-{{toast.type}}"
          (click)="toastService.removeToast(toast.id)"
        >
          <div class="toast-icon">
            @switch (toast.type) {
              @case ('success') {
                <mat-icon>check_circle</mat-icon>
              }
              @case ('error') {
                <mat-icon>error</mat-icon>
              }
              @case ('warning') {
                <mat-icon>warning</mat-icon>
              }
              @case ('info') {
                <mat-icon>info</mat-icon>
              }
            }
          </div>
          <div class="toast-content">
            <div class="toast-title">{{ getTitle(toast.type) }}</div>
            <div class="toast-message">{{ toast.message }}</div>
          </div>
          <button class="toast-close" (click)="toastService.removeToast(toast.id); $event.stopPropagation()">
            <mat-icon>close</mat-icon>
          </button>
          <div class="toast-progress" [style.animation-duration.ms]="toast.duration"></div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toastService = inject(ToastService);

  ngOnInit() {
    // Component automatically subscribes to toast service
  }

  getTitle(type: string): string {
    switch (type) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Info';
      default: return 'Notification';
    }
  }
}
