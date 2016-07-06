import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { environment } from './app';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

bootstrap(AppComponent, [ APP_ROUTER_PROVIDERS ])
    .catch(err => console.error(err));