import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS }
    from '@angular/router';
import { provide } from '@angular/core';
import { Location } from '@angular/common';
import { Angular2DemoAppComponent } from './angular2-demo.component';
//import { Driver }             from './shared/driver';
//import { DriverService }      from './shared/driver.service';



beforeEachProviders(() => [Angular2DemoAppComponent]);

describe('App: Angular2Demo', () => {
  it('should create the app',
      inject([Angular2DemoAppComponent], (app: Angular2DemoAppComponent) => {
    expect(app).toBeTruthy();
  }));
/*
  it('should have as title \'angular2-demo works!\'',
      inject([Angular2DemoAppComponent], (app: Angular2DemoAppComponent) => {
    expect(app.title).toEqual('angular2-demo works!');
  }));
*/
});
describe('Routing', () => {

  let location: Location;
  let router: Router;

  beforeEachProviders(() => [
    Routes,
    Location,
    provide(Router, {useClass: Router}),
    provide(ROUTER_PROVIDERS, {useValue: Angular2DemoAppComponent})
  ]);

  beforeEach(inject([Router, Location], (r, l) => {
    router = r;
    location = l;
  }));

  it('Should navigate to list', (done) => {
    router.navigate(['list']).then(() => {
      expect(location.path()).toBe('/list');
      done();
    }).catch(e => done.fail(e));
  });

  it('Should navigate to modify', (done) => {
    router.navigate(['modify']).then(() => {
      expect(location.path()).toBe('/modify');
      done();
    }).catch(e => done.fail(e));
  });
  it('Should navigate to add', (done) => {
    router.navigate(['add']).then(() => {
      expect(location.path()).toBe('/add');
      done();
    }).catch(e => done.fail(e));
  });

  it('Should navigate to delete', (done) => {
    router.navigate(['delete']).then(() => {
      expect(location.path()).toBe('/delete');
      done();
    }).catch(e => done.fail(e));
  });
});
