import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { IApiError } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error as IApiError;

        if (error.status === 401) {

        } else if (error.status === 400) {
          alert(errorMessage.message || 'Bad Request');
        } else if (error.status === 500) {

        }

        return throwError(() => error);
      })
    );
  }
}

export const apiUrl: string = environment.production ? environment.apiUrl: environment.apiDevUrl;
