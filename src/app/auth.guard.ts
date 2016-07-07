import { Injectable }        from '@angular/core';
import { CanActivate, Router,  ActivatedRouteSnapshot,
    RouterStateSnapshot }    from '@angular/router';
import { AuthService }       from './auth.service';
import { DriverService }      from './shared/driver.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              public driverService: DriverService) {}

  canActivate():boolean {
    if (this.authService.isRowSelected) {
      console.info('A row is selected. Continuing with the current process');
      return true;
    } else {
      this.driverService.active_menu = "List";
      this.router.navigate(['/list']);
      console.error('No row is selected. Returning to the List.');
      return false;
    }
  }
}
