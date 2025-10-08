import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 400) {
        if (err.error?.title) {
          toastService.error(err.error.title);
        } else if (err.error?.message) {
          toastService.error(err.error.message);
        } else if (typeof err.error === 'string') {
          toastService.error(err.error);
        } else {
          toastService.error('Bad request. Please check your input.');
        }
      }
      if (err.status === 401) {
        toastService.error('You are not authorized to access this resource.');
      }
      if (err.status === 403) {
        toastService.error('Access forbidden. You do not have permission.');
      }
      if (err.status === 404) {
        router.navigateByUrl('/not-found');
      }
      if (err.status === 500) {
        router.navigateByUrl('/server-error');
      }
      if (err.status === 0 || !err.status) {
        toastService.error('Network error. Please check your connection.');
      }
      return throwError(() => err);
    })
  )
};
