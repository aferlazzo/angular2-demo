import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import { NgForm }    from '@angular/common';
import { Driver } from './shared/driver';
import { DriverService } from './shared/driver.service';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ DriverService, HTTP_PROVIDERS ]
})
export class AppComponent implements OnInit{

  constructor( public driverService: DriverService) {}

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
   The configured routes determine what happens next...
   */

  change_active_menu(next_active_menu:string) {
    var msg = `change_active_menu(`+ next_active_menu + `)`;
    var zzz = this.driverService.driverArray.length;

    console.log(`${msg} I now have ${zzz} drivers and am activing the ${next_active_menu} menu`);

    this.driverService.active_menu = next_active_menu;
  }

}

