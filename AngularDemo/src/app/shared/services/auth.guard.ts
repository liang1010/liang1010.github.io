import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DependenciesService } from './dependencies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private dependenciesService: DependenciesService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the token is present (e.g., in localStorage or a service)
    const token = this.authService?.token ?? "";
    // Clone the request and add the Authorization header if a token exists

    if (token) {
      return true; // Token is present, allow access
    } else {
      // Token is missing, redirect to the login page (or handle as needed)
      // For example, you can navigate to the login page:
      this.dependenciesService.navigateByUrl('/');
      return false;
    }
  }
}
