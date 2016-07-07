import { Component, OnInit }  from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { Router }             from '@angular/router';
import { NgClass }            from '@angular/common';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';
import { SelectService }      from '../shared/select.service';
import { AuthService }        from '../auth.service';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-modify',
  templateUrl: 'modify.component.html',
  styleUrls: ['modify.component.css'],
  providers:  [ SelectService, Driver, DriverService, HTTP_PROVIDERS ],
  directives: [ NgClass, ROUTER_DIRECTIVES ]})

export class ModifyComponent implements OnInit {

  constructor(
      public authService: AuthService,
      public driverService: DriverService,
      private router: Router
  ) {  }

  private message = {
    success: '',
    error: ''
  };

  // for dropdown lists
  driving_ability_list = ['Bicycle', 'Scooter', 'Motorcycle', 'Car (stick)', 'Car (automatic)', 'Truck'];

  state_abbreviation_list = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL',
    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MH', 'MA', 'MI', 'FM', 'MN', 'MS', 'MO', 'MT', 'NE',
    'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'];

  // driver model
  driver = {
    selected: false,
    drivername: '',
    password: '',
    ability: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  };

  selected_index:number;

  ngOnInit (){
    this.driverService.fillDriverArray();
    var myDrivers = this.driverService.driverArray;
    console.log("(in modify.component.ts) driverArray has " + myDrivers.length + ' drivers');
    // find selected rows
    this.selected_index = this.driverService.find_row_to_modify();


    if (this.selected_index > -1) {
      // populate this modify page form field model with existing driverArray data
      let i = this.selected_index;
      this.driver.selected    = this.driverService.driverArray[i].selected;
      this.driver.drivername  = this.driverService.driverArray[i].drivername;
      this.driver.password    = this.driverService.driverArray[i].password;
      this.driver.ability     = this.driverService.driverArray[i].ability;
      this.driver.firstname   = this.driverService.driverArray[i].firstname;
      this.driver.lastname    = this.driverService.driverArray[i].lastname;
      this.driver.email       = this.driverService.driverArray[i].email;
      this.driver.address     = this.driverService.driverArray[i].address;
      this.driver.city        = this.driverService.driverArray[i].city;
      this.driver.state       = this.driverService.driverArray[i].state;
      this.driver.zip         = this.driverService.driverArray[i].zip;
      this.driver.phone       = this.driverService.driverArray[i].phone;
    } else {
      // go back to list view
      this.driverService.active_menu = "List";
      this.router.navigate(['/list']);
    }
  }

  cancel_modify() {
    // go back to list view
    this.driverService.active_menu = "List";
    this.router.navigate(['/list']);
  }

  /*
   modify_driver() is the click handler for the Modify button on the modify page.
   */
  modify_driver(driver:Driver){
    this.driverService.modify_selected_driver_in_driverArray(driver);
    this.driverService.modify_selected_driver_in_database(driver).subscribe(
        driver => {
          this.message.success = 'Driver ' + this.driver.drivername + ' updated';

          // go back to list view
          this.driverService.active_menu = "List";
          this.router.navigate(['/list']);
        },
        error => {
          if (error.status == '404') {
            this.message.error = 'Driver not found';
          } else {
            this.message.error = 'Unknown error';
          }
        }
    );
  }
}
