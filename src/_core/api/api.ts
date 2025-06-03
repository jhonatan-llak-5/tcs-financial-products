import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let message = '';

        if (error.status === 401) {

        } else if (error.status === 400) {

        } else if (error.status === 500) {

        }

        return throwError(() => error);
      })
    );
  }
}

export const apiUrl: string = environment.production ? environment.apiUrl: environment.apiDevUrl;
export const hostUrl: string = environment.production ? environment.hostUrl: environment.hostDevUrl;
