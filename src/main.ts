import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS }     from '@angular/http';
import { AppComponent } from './app/app.component';
import { environment } from './app';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { AuthGuard }       from './app/auth.guard';
import { DriverService }      from './app/shared/driver.service';

// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
    HashLocationStrategy } from '@angular/common';

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
    DriverService, HTTP_PROVIDERS, AuthGuard
])
    .catch(err => console.error(err));