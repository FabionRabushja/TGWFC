import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './ui/app.component';
import {WebsocketService} from './crossconcern/services/websocket.services';
import {ViewComponent} from './ui/view';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';
import {HomeComponent} from './ui/view/home';


@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
