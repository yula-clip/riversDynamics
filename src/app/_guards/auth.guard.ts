import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const isAdmin = route.firstChild.data.isAdmin;
    if (isAdmin) {
      const hasAllowedRole = isAdmin === this.authService.getCurrentUser.isAdmin;
      if (!hasAllowedRole) {
        this.router.navigate(['/']);
      }
      return hasAllowedRole;
    }

    return true;
  }
}
