import { Injectable }        from '@angular/core';
import { CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot}     from '@angular/router';
import { AuthService }       from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService,
              private router: Router) {}

  canActivate(next:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if (this.authService.last_row_selected > -1) {
      console.info('A row is selected. Continuing with the current process');
      return true;
    } else {
      this.authService.active_menu = "List";
      alert('Select a driver row by clicking on it');
      this.router.navigate(['/list']);
      console.info('No row is selected. Returning to the List.');
      return false;
    }
  }
}
