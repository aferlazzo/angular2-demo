import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Driver }  from './shared/driver';

@Injectable()
export class AuthService {
  public isADriverSelected: boolean;
  public last_row_selected: number;
  public driverArray: Driver[];
  public active_menu: string = 'List';

  constructor () {}

  // find selected rows
  isRowSelected():boolean {
    if ((!this.last_row_selected) || (this.last_row_selected == -1)) {
      //alert('Select a driver row by clicking on it to modify');
      this.isADriverSelected = false;
    } else {
      this.isADriverSelected = true;
    }

    return this.isADriverSelected;
  }
}
