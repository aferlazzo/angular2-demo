import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2DemoAppComponent } from '../app/angular2-demo.component';

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
