import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provide }        from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { Angular2DemoAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2DemoAppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass:HashLocationStrategy}),
  HTTP_PROVIDERS
]);
