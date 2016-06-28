import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, FORM_PROVIDERS } from '@angular/common';
import { NgClass }            from '@angular/common';
import { Driver }             from '../shared/driver';
import { DriverService }      from '../shared/driver.service';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers:  [ FORM_PROVIDERS, Driver ],
  directives: [FORM_DIRECTIVES, NgClass]
})

export class ListComponent implements OnInit {

  constructor(private driverService: DriverService) {}

  drivers = this.driverService.driverArray;

  ngOnInit() {
    console.info('list.component.ts initialized, emitted custom event for List view');
  }

  errorMessage = "";
  saved_drivername = "";
  last_row_selected = -1;

  /*
   row_selected is the click handler toggling row selection
   */
  row_selected(i:number) {
    this.driverService.driverArray[i].selected = !this.driverService.driverArray[i].selected;
    let s = this.drivers[i].selected == true ? "" : " NOT";
    console.log(`Row ${i} is${s} selected`);
  }
}