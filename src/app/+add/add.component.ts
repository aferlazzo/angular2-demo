import { Component, OnInit }  from '@angular/core';
import {
    FormBuilder,
    Validators,
    Control,
    ControlGroup,
    FORM_DIRECTIVES
} from '@angular/common';
import { DrivernameValidator } from '../shared/drivernameValidator';
import { Router }             from '@angular/router';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';
import { SelectService }      from '../shared/select.service';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  providers: [ SelectService, Driver ],
  directives: [ FORM_DIRECTIVES ]
})

export class AddComponent implements OnInit {

  constructor (
      private router: Router,
      private driverService: DriverService
  ) { }

  ngOnInit() {
    this.driver = this.clear_driver(this.driver);
    console.info('add.component.ts initialized');
  }

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

  current_driver:Driver;

  chosen_ability:string = 'Select One';

  submitted = false;

  /*

  A Control can be bound to an input element, and takes 3 arguments (all optional);
  a default value, a validator and a asynchronous validator.
  For example

  this.drivername = new Control('Default value', Validators.required, UsernameValidator.checkIfAvailable);

  Which can be used in your HTML using the "ngControl" directive.

  <input required type="text" ngControl="drivername" />

  And use the following HTML to show the related error message

  <div *ngIf="drivername.dirty && !drivername.valid">
  <p *ngIf="drivername.errors.minlength">
  A drivername needs to be at least 4 characters.
  </p>
  </div>

  */
  




  clear_driver(driver:Driver) {
    driver.selected = false;
    driver.drivername = '';
    driver.password = '';
    driver.ability = '';
    driver.firstname = '';
    driver.lastname = '';
    driver.email = '';
    driver.address = '';
    driver.city = '';
    driver.state = '';
    driver.zip = '';
    driver.phone = '';

    this.chosen_ability = 'Select';
    return driver;
  }

  cancel_add() {
    // go back to list view
    this.router.navigate(['/list']);
    this.driverService.active_menu = "List";
  }

  /*
   add_driver() is the event handler for clicking the add button. It calls
   add_driver_to_driverArray() and add_driver_to_database() in driver.service.ts service.
   */
  add_driver(driver:Driver) {
    this.message.success = '';
    this.message.error = '';
    this.current_driver = driver;

    this.driverService.add_driver_to_database(driver)
        .subscribe(
            driver  => {
              this.message.success = 'Driver ' + this.driver.drivername + ' added';
              //**** must add new driver to end of driver_array, so the list view will reflect this new driver ***
              this.driverService.add_driver_to_driverArray(this.current_driver);

              // go back to list view
              this.router.navigate(['/list']);
              this.driverService.active_menu = "List";
            },
            error => {
              if (error.status == '403') {
                this.message.error = 'Oops, Duplicate Driver Name';
              } else {
                this.message.error = 'Unknown error';
              }
            }
        );
  }


  // click handler for the drive ability list items
  update_ability(e:Event, chosen:string) {
    e.preventDefault();
    this.chosen_ability = chosen;
    this.driver.ability = chosen;
  }
}
