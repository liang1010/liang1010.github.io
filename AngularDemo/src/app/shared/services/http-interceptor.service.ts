import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BackgroundProgressService } from './background-progress.service';
import { NotificationService } from './notification.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private backgroundProgressService: BackgroundProgressService,
    private notificationService: NotificationService

  ) { }
  pendingRequestsCount = 0;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.pendingRequestsCount++;
    // Get the token from wherever you store it (e.g., local storage)
    const token = this.authService?.token ?? "";
    this.backgroundProgressService.showProgress({});
    // Clone the request and add the Authorization header if a token exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Handle the request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors here
        console.error('HTTP Error:', error);
        this.notificationService.showError(`${error.status} ${error.statusText}`)

        // Pass the error to the next handler
        return throwError(error);
      }),
      finalize(() => {
        this.pendingRequestsCount--;
        if (this.pendingRequestsCount == 0)
          this.backgroundProgressService.endProgress();
      }
      )
    );
  }
}
