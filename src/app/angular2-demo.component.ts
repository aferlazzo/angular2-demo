import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import { AboutComponent } from './+about/about.component';
import { ListComponent } from './+list/list.component';
import { ModifyComponent } from './+modify/modify.component';
import { AddComponent } from './+add/add.component';
import { DeleteComponent } from './+delete/delete.component';
import { Driver } from './shared/driver';
import { DriverService } from './shared/driver.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'angular2-demo.component.html',
  styleUrls: ['angular2-demo.component.css'],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ DriverService, HTTP_PROVIDERS ]
})
export class Angular2DemoAppComponent implements OnInit{
  constructor( private driverService: DriverService) {}

  drivers:Driver[];
  subcomponent_name: string;

  ngAfterContentChecked() {
    this.subcomponent_name = this.driverService.active_menu;
  }

  ngOnInit() {
    console.info('app.component.ts initialized');
    this.subcomponent_name = this.driverService.active_menu;

    // this is where the drivers list gets loaded....
    this.driverService.fillDriverArray();

    if (this.drivers) {
      console.info('app.component.ts There are ' +
          this.drivers.length + ' driver records being returned');
    }

    /*
    //jump to the list view by default (since there is no default route defined)
    this.router.navigate(['/list']);
    this.driverService.active_menu = "List";
    */
  }


  /*
   change_active_menu is the click handler for the navbar in the app.component.html file.
   The configured routes determine what happens next...
   */

  change_active_menu(next_active_menu:string) {
    var msg = `change_active_menu(`+ next_active_menu + `)`;
    var zzz = this.driverService.driverArray.length;

    console.log(`${msg} I now have ${zzz} drivers`);

    // to change the highlighted item on the nav bar...
    this.driverService.active_menu = next_active_menu;

  }

}
