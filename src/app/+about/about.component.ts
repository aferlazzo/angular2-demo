import { Component, Input, trigger, state, style,
    transition, animate }     from '@angular/core';
import {TimerWrapper}         from '@angular/core/src/facade/async';

@Component({
  moduleId: module.id,
  selector: 'app-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css'],
  animations: [
    trigger ('initState', [
      // animation trigger name: initState. 2 states: not_started, started
      state('not_started', style({
        margin: '13rem 0 0 -100%'
      })),
      state('started', style({
        margin: '13rem 0 0 0'
      })),
      transition('not_started => started', animate('100ms ease-in')),
      transition('started => not_started', animate('100ms ease-out'))
    ])
  ]
})
export class AboutComponent {

  constructor() {
    var timerId;

    console.log("page_state", this.page_state);

    timerId = TimerWrapper.setTimeout(() => {
      this.page_state = 'started';
      console.log("page_state", this.page_state);
    }, 10);
  }

  page_state="not_started";

}
