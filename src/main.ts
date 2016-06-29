import { bootstrap } from '@angular/platform-browser-dynamic';
import { Angular2DemoAppComponent } from './app/angular2-demo.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import {HTTP_PROVIDERS} from '@angular/http';

bootstrap(Angular2DemoAppComponent, [ APP_ROUTER_PROVIDERS ])
    .catch(err => console.error(err));