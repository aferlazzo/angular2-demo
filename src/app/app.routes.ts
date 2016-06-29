import { provideRouter, RouterConfig } from '@angular/router';
import { ListComponent } from './+list/list.component';
import { ModifyComponent } from './+modify/modify.component';
import { AddComponent } from './+add/add.component';
import { DeleteComponent } from './+delete/delete.component';
import { AboutComponent } from './+about/about.component';

export const routes: RouterConfig = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'modify',
    component: ModifyComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'delete',
    component: DeleteComponent
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

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];