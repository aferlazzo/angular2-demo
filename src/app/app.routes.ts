import { provideRouter, RouterConfig } from '@angular/router';
import { ListComponent }   from './+list/list.component';
import { ModifyComponent } from './+modify/modify.component';
import { AddComponent }    from './+add/add.component';
import { DeleteComponent } from './+delete/delete.component';
import { AboutComponent }  from './+about/about.component';
import { AuthGuard }       from './auth.guard';
import { AuthService }     from './auth.service';


export const routes: RouterConfig = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'modify',
    component: ModifyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'delete',
    component: DeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: '/list',
    terminal: true
  },
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS,
  AuthGuard
];
