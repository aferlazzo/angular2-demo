import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import { NgForm }    from '@angular/common';
import { Driver } from './shared/driver';
import { DriverService } from './shared/driver.service';
import { AuthService } from './auth.service';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ DriverService, HTTP_PROVIDERS ]
})
export class AppComponent implements OnInit{

  constructor(
      public driverService: DriverService,
      public authService: AuthService) {}

  drivers:Driver[];
  subcomponent_name: string;

  ngOnInit() {
    this.subcomponent_name = this.driverService.active_menu;
    console.info('app.component.ts initialized and on page ' + this.subcomponent_name);

    // this is where the drivers list gets loaded....
    this.driverService.fillDriverArray();

    if (this.drivers) {
      console.info('app.component.ts There are ' +
          this.drivers.length + ' driver records being returned');
    }
  }


  /*
   change_active_menu is the click handler for the navbar in the app.component.html file.
   The app.routes.ts file settings determine what happens next...
   */

  change_active_menu(next_active_menu:string) {
    var msg = `change_active_menu(`+ next_active_menu + `)`;
    var len;

    if (this.authService.driverArray) {
      len = this.authService.driverArray.length;

      console.log(`${msg} I now have ${len} drivers and am activing the ${next_active_menu} menu`);

      // The driverService singleton means that there is only 1 instsance of it during page execution.
      // This means that variables set by one component are visible by other components.
      this.driverService.active_menu = next_active_menu;
      this.subcomponent_name = this.driverService.active_menu;
    } else {
      alert("authService.driverArray is not initialized");
    }
  }
}

