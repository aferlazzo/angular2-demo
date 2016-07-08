import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, FORM_PROVIDERS } from '@angular/common';
import { NgClass }            from '@angular/common';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';
import { SortService }        from './sort.service';
import { AuthService }        from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers:  [ FORM_PROVIDERS, Driver, SortService ],
  directives: [FORM_DIRECTIVES, NgClass]
})

export class ListComponent implements OnInit {

  constructor(
      public driverService: DriverService,
      public sortService: SortService,
      public authService: AuthService) {}

  drivers = this.driverService.driverArray;
  directionA = -1;
  directionB = -1;
  directionC = -1;
  directionD = -1;
  directionE = -1;
  directionF = -1;
  directionG = -1;
  directionH = -1;
  directionI = -1;
  directionJ = -1;

  drivername_up_arrow_hidden:boolean;
  drivername_down_arrow_hidden:boolean;
  firstname_up_arrow_hidden:boolean;
  firstname_down_arrow_hidden:boolean;
  lastname_up_arrow_hidden:boolean;
  lastname_down_arrow_hidden:boolean;
  ability_up_arrow_hidden:boolean;
  ability_down_arrow_hidden:boolean;
  email_up_arrow_hidden:boolean;
  email_down_arrow_hidden:boolean;
  address_up_arrow_hidden:boolean;
  address_down_arrow_hidden:boolean;
  city_up_arrow_hidden:boolean;
  city_down_arrow_hidden:boolean;
  state_up_arrow_hidden:boolean;
  state_down_arrow_hidden:boolean;
  zip_up_arrow_hidden:boolean;
  zip_down_arrow_hidden:boolean;
  phone_up_arrow_hidden:boolean;
  phone_down_arrow_hidden:boolean;

  clearSortIndicators() {
    this.drivername_up_arrow_hidden = true;
    this.drivername_down_arrow_hidden = true;
    this.firstname_up_arrow_hidden = true;
    this.firstname_down_arrow_hidden = true;
    this.lastname_up_arrow_hidden = true;
    this.lastname_down_arrow_hidden = true;
    this.ability_up_arrow_hidden = true;
    this.ability_down_arrow_hidden = true;
    this.email_up_arrow_hidden = true;
    this.email_down_arrow_hidden = true;
    this.address_up_arrow_hidden = true;
    this.address_down_arrow_hidden = true;
    this.city_up_arrow_hidden = true;
    this.city_down_arrow_hidden = true;
    this.state_up_arrow_hidden = true;
    this.state_down_arrow_hidden = true;
    this.zip_up_arrow_hidden = true;
    this.zip_down_arrow_hidden = true;
    this.phone_up_arrow_hidden = true;
    this.phone_down_arrow_hidden = true;
  }


  ngOnInit() {
    console.info('list.component.ts initialized');
    this.clearSortIndicators();
  }

  errorMessage = "";
  saved_drivername = "";

  /*
   row_selected is the click handler toggling row selection
   */
  row_selected(i:number) {
    this.driverService.driverArray[i].selected = !this.driverService.driverArray[i].selected;
    let s = this.drivers[i].selected == true ? "" : " NOT";
    if (s == "") {
      this.authService.last_row_selected = i;
    } else {
      this.authService.last_row_selected = -1;
    }
    console.log(`Row ${i} is${s} selected`);
  }

  /*
   Event handler for clicking on the Driver heading.
   Argument 1: 1 | -1
   meaning ascending/descending.
   */
  sortByDriverName() {
    this.directionA = this.directionA * -1;
    this.clearSortIndicators();
    if (this.directionA > 0) {
      this.drivername_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'drivername', 'ascending');
    } else {
      this.drivername_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'drivername', 'descending');
    }
    console.log(`sort by drivername (${this.directionA})`);
  }

  /*
 Event handler for clicking on the First Name heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByFirstName() {
    this.directionB = this.directionB * -1;
    this.clearSortIndicators();
    if (this.directionB > 0) {
      this.firstname_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'firstname', 'ascending');
    } else {
      this.firstname_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'firstname', 'descending');
    }
    console.log(`sort by firstname (${this.directionB})`);
  }

  /*
 Event handler for clicking on the Last Name heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByLastName() {
    this.directionC = this.directionC * -1;
    this.clearSortIndicators();
    if (this.directionC > 0) {
      this.lastname_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'lastname', 'ascending');
    } else {
      this.lastname_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'lastname', 'descending');
    }
    console.log(`sort by lastname (${this.directionC})`);
  }

  /*
 Event handler for clicking on the Driver Ability heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByAbility() {
    this.directionD = this.directionD * -1;
    this.clearSortIndicators();
    if (this.directionD > 0) {
      this.ability_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'ability', 'ascending');
    } else {
      this.ability_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'ability', 'descending');
    }
    console.log(`sort by ability (${this.directionD})`);
  }

  /*
 Event handler for clicking on the Email heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByEmail() {
    this.directionE = this.directionE * -1;
    this.clearSortIndicators();
    if (this.directionE > 0) {
      this.email_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'email', 'ascending');
    } else {
      this.email_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'email', 'descending');
    }
    console.log(`sort by email (${this.directionE})`);
  }

  /*
 Event handler for clicking on the Address heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByAddress() {
    this.directionF = this.directionF * -1;
    this.clearSortIndicators();
    if (this.directionF > 0) {
      this.address_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'address', 'ascending');
    } else {
      this.address_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'address', 'descending');
    }
    console.log(`sort by address (${this.directionF})`);
  }

  /*
 Event handler for clicking on the City heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByCity() {
    this.directionG = this.directionG * -1;
    this.clearSortIndicators();
    if (this.directionG > 0) {
      this.city_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'city', 'ascending');
    } else {
      this.city_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'city', 'descending');
    }
    console.log(`sort by City (${this.directionG})`);
  }

  /*
 Event handler for clicking on the Driver heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByState() {
    this.directionH = this.directionH * -1;
    this.clearSortIndicators();
    if (this.directionH > 0) {
      this.state_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'state', 'ascending');
    } else {
      this.state_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'state', 'descending');
    }
    console.log(`sort by State (${this.directionH})`);
  }
  /*
 Event handler for clicking on the Driver heading.
 Argument 1: 1 | -1
 meaning ascending/descending.
 */
  sortByZip() {
    this.directionI = this.directionI * -1;
    this.clearSortIndicators();
    if (this.directionI > 0) {
      this.zip_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'zip', 'ascending');
    } else {
      this.zip_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'zip', 'descending');
    }
    console.log(`sort by Zipcode(${this.directionI})`);
  }
    /*
   Event handler for clicking on the Driver heading.
   Argument 1: 1 | -1
   meaning ascending/descending.
   */
  sortByPhone() {
    this.directionJ = this.directionJ * -1;
    this.clearSortIndicators();
    if (this.directionJ > 0) {
      this.phone_up_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'phone', 'ascending');
    } else {
      this.phone_down_arrow_hidden = false;
      this.sortService.sortDrivers(this.driverService.driverArray, 'phone', 'descending');
    }
    console.log(`sort by phone number(${this.directionJ})`);
  }
}