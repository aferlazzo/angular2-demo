import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormControl,
    REACTIVE_FORM_DIRECTIVES, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';
import { SelectService }      from '../shared/select.service';
import { AuthService }        from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-modify',
  templateUrl: 'modify.component.html',
  styleUrls: ['modify.component.css'],
  providers: [SelectService, Driver],
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class ModifyComponent implements OnInit {

  driver_form: FormGroup;
  active = true;

  constructor(
      public authService: AuthService,
      public driverService: DriverService,
      private router: Router) {
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
    let i  = this.authService.last_row_selected;

    console.log("(in modify.component.ts) driverArray has " + this.authService.driverArray.length + ' drivers');

    // populate this modify page form field model with existing driverArray data
    this.driver.selected = this.authService.driverArray[i].selected;
    this.driver.drivername = this.authService.driverArray[i].drivername;
    this.driver.password = this.authService.driverArray[i].password;
    this.driver.ability = this.authService.driverArray[i].ability;
    this.driver.firstname = this.authService.driverArray[i].firstname;
    this.driver.lastname = this.authService.driverArray[i].lastname;
    this.driver.email = this.authService.driverArray[i].email;
    this.driver.address = this.authService.driverArray[i].address;
    this.driver.city = this.authService.driverArray[i].city;
    this.driver.state = this.authService.driverArray[i].state;
    this.driver.zip = this.authService.driverArray[i].zip;
    this.driver.phone = this.authService.driverArray[i].phone;
  }

  cancel_modify() {
    // go back to list view
    this.authService.active_menu = "List";
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
          this.authService.active_menu = "List";
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
