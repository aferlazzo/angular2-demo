import { Injectable }        from '@angular/core';
import { CanActivate, Router,  ActivatedRouteSnapshot,
    RouterStateSnapshot }    from '@angular/router';
import { AuthService }       from './auth.service';
import { DriverService }     from './shared/driver.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService,
              public router: Router,
              public driverService: DriverService) {}

  canActivate():boolean {
    if (this.authService.last_row_selected > -1) {
      console.info('A row is selected. Continuing with the current process');
      return true;
    } else {
      this.driverService.active_menu = "List";
      alert('Select a driver row by clicking on it to modify the driver');
      this.router.navigate(['/list']);
      console.info('No row is selected. Returning to the List.');
      return false;
    }
  }
}
