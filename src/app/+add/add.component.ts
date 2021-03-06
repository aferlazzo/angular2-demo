import { Component, OnInit, Input, trigger, state, style,
    transition, animate }     from '@angular/core';
import {TimerWrapper}         from '@angular/core/src/facade/async';
import { FormGroup, FormControl,
    REACTIVE_FORM_DIRECTIVES, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';
import { SelectService }      from '../shared/select.service';
import { AuthService }        from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  providers: [ SelectService, Driver ],
  directives: [REACTIVE_FORM_DIRECTIVES],
  animations: [
    trigger ('initState', [
      // animation trigger name: initState. 2 states: not_started, started
      state('not_started', style({
        margin: '13rem 0 0 -100%'
      })),
      state('started', style({
        margin: '13rem 0 0 0'
      })),
      transition('not_started => started', animate('100ms ease-in')),
      transition('started => not_started', animate('100ms ease-out'))
    ])
  ]

})

export class AddComponent implements OnInit {

  driver_form: FormGroup;
  active = true;

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

    var timerId;

    console.log("page_state", this.page_state);

    timerId = TimerWrapper.setTimeout(() => {
      this.page_state = 'started';
      console.log("page_state", this.page_state);
    }, 10);

  }

  page_state="not_started";

  ngOnInit() {
    this.driver = this.clear_driver(this.driver);
    console.info('add.component.ts initialized');
  }

  message = {
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
  
}
