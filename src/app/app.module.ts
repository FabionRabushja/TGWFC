import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './ui/app.component';
import {WebsocketService} from "./crossconcern/services/websocket.services";
import {ViewComponent} from "./ui/views";
import {PreloadAllModules, RouterModule} from "@angular/router";
import { ROUTES } from "./app.routes";


@NgModule({
  declarations: [
    AppComponent,
    ViewComponent
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
