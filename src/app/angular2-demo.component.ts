import { Component, OnInit } from '@angular/core';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS}from '@angular/router';
import { AboutComponent } from './+about';
import { ListComponent } from './+list';
import { ModifyComponent } from './+modify';
import { AddComponent } from './+add';
import { DeleteComponent } from './+delete';
import { Driver } from './shared/driver';
import { DriverService } from './shared/driver.service';

@Component({
  moduleId: module.id,
  selector: 'angular2-demo-app',
  templateUrl: 'angular2-demo.component.html',
  styleUrls: ['angular2-demo.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, DriverService]
})
@Routes([
  {path: '/list', component: ListComponent},
  {path: '/modify', component: ModifyComponent},
  {path: '/add', component: AddComponent},
  {path: '/delete', component: DeleteComponent},
  {path: '/about', component: AboutComponent}
])
export class Angular2DemoAppComponent implements OnInit{
  constructor( private driverService: DriverService,
               private router:Router) {}

  drivers:Driver[];

  ngOnInit() {
    console.info('app.component.ts initialized');

    // this is where the drivers list gets loaded....
    this.driverService.fillDriverArray();

    if (this.drivers) {
      console.info('app.component.ts There are ' +
          this.drivers.length + ' driver records being returned');
    }

    //jump to the list view by default (since there is no default route defined)
    this.router.navigate(['/list']);
    this.driverService.active_menu = "List";
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
