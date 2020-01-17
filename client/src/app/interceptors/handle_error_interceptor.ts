import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()

export class HandleErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(evt => {}),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
          }
        }
        return of(error);
      }));
  }
}
