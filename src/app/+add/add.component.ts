import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormControl,
    REACTIVE_FORM_DIRECTIVES, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';
import { SelectService }      from '../shared/select.service';
import { EqualValidator }     from './equal-validator.directive';
import { AuthService }        from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  providers: [ SelectService, Driver ],
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class AddComponent implements OnInit {

  driver_form: FormGroup;

  constructor (
      public authService: AuthService,
      private router: Router,
      public driverService: DriverService) {
    this.driver_form = new FormGroup ({
      drivername: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      firstname:  new FormControl('', [
        Validators.required
      ]),
      lastname:   new FormControl('', [
        Validators.required
      ]),
      password:   new FormControl('', [
        Validators.required
      ]),
      ability:   new FormControl('', [
        Validators.required
      ]),
      email:     new FormControl('', [
        Validators.required
      ]),
      address:   new FormControl('', [
        Validators.required
      ]),
      city:      new FormControl('', [
        Validators.required
      ]),
      state:     new FormControl('', [
        Validators.required
      ]),
      zip:       new FormControl('', [
        Validators.required
      ]),
      phone:     new FormControl('', [
        Validators.required
      ]),

    });

  }

  ngOnInit() {
    this.driver = this.clear_driver(this.driver);
    console.info('add.component.ts initialized');
  }

  message = {
    success: '',
    error: ''
  };
  /*
  driverForm = new FormGroup ({
    drivername: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    ability: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    zip: new FormControl(),
    phone:new FormControl()
  })
  */


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
    this.authService.active_menu = 'List';
    this.router.navigate(['/list']);
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
              // **** must add new driver to end of driver_array, so the list view will reflect this new driver ***
              this.driverService.add_driver_to_driverArray(this.current_driver);

              // go back to list view
              this.authService.active_menu = 'List';
              this.router.navigate(['/list']);
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
