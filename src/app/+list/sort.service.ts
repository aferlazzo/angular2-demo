import {Injectable}                from '@angular/core';
import { Driver }  from '../shared/driver';
import { DriverService }  from '../shared/driver.service';
import { AuthService } from '../auth.service';
@Injectable()
export class SortService {
  the_result:[{ drivername: string, value: number }];


  constructor(
      public authService: AuthService,
      public driverService: DriverService) { }

  drivers = this.authService.driverArray;


  /*
   function name: sortDrivers
   description: sort an array of objects by the 'value' property
   arg1: array of objects, i.e. [{drivername:string, firstname:number...}]
   arg2: name of property to sort by
   arg3: direction, i.e. 1 = ascending | -1 =descending

   As an object property reminder: object.foo == object["foo"]

   drivers[0].drivername == drivers[0]["drivername"]
   drivers[0].firstname == drivers[0]["firstname"]
   */
  sortDrivers(array: Driver[], sortByPropertyName: string, direction: string) {
    let d = 1; // ascending : 1 | descending : -1
    array.sort((a, b) => {
      if (direction == 'descending') {
        d = -1;
      }

      if (a[sortByPropertyName].toUpperCase() < b[sortByPropertyName].toUpperCase()) {
        return -1 * d;
      } else if (a[sortByPropertyName].toUpperCase() > b[sortByPropertyName].toUpperCase()) {
        return 1 * d;
      } else {
        return 0;
      }

    });
    return array;
  }



  print_results() {

    let len = (this.the_result).length;
    let i:number;
    for (i = 0; i < len; i = i + 1) {
      console.log('drivername: ' + this.the_result[i].drivername + ' value: ' + this.the_result[i].value);
    }
  }
}



