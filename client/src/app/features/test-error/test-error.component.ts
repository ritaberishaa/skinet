import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-test-error',
  imports: [MatButton],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => {
        // Error is handled by the error interceptor
        // which will show appropriate toast messages
      }
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: response => console.log(response),
      error: error => {
        // Error is handled by the error interceptor
        // which will show appropriate toast messages
      }
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/unauthorized').subscribe({
      next: response => console.log(response),
      error: error => {
        // Error is handled by the error interceptor
        // which will show appropriate toast messages
      }
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/internalerror').subscribe({
      next: response => console.log(response),
      error: error => {
        // Error is handled by the error interceptor
        // which will show appropriate toast messages
      }
    });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'buggy/validationerror', {}).subscribe({
      next: response => console.log(response),
      error: error => {
        // Error is handled by the error interceptor
        // which will show appropriate toast messages
      }
    });
  }

  // Test success toast
  testSuccessMessage() {
    this.toastService.success('This is a beautiful success message! Your action was completed successfully.');
  }

  // Test info toast
  testInfoMessage() {
    this.toastService.info('This is an informational message to keep you updated on what\'s happening.');
  }

  // Test warning toast
  testWarningMessage() {
    this.toastService.warning('This is a warning message. Please pay attention to this important information.');
  }

  // Test network error (simulate)
  testNetworkError() {
    this.http.get('http://invalid-url-that-will-fail.com/api/test').subscribe({
      next: response => console.log(response),
      error: error => {
        // Error is handled by the error interceptor
        // which will show appropriate toast messages
      }
    });
  }
}
