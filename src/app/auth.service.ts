import { Component, OnInit }  from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { DriverService }      from './shared/driver.service';

@Injectable()
export class AuthService {
  isADriverSelected: boolean = false;

  constructor (public driverService: DriverService) {}

  // find selected rows
  isRowSelected():boolean {
    if (this.driverService.find_row_to_modify() > -1) {
      this.isADriverSelected = true;
    } else {
      this.isADriverSelected = true;
    }
    return this.isADriverSelected;
  }
}
