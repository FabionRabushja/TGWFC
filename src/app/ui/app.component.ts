import { Component } from '@angular/core';
import {ROOT_SELECTOR} from '../crossconcern/utilities/properties/selector.property';

@Component({
  selector: ROOT_SELECTOR,
  templateUrl: './app.component.html',
  styleUrls: ['../app.component.scss']
})
export class AppComponent {
  title = 'The Game With Funny Cards';
}
