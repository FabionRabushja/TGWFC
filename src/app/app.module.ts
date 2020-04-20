import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './ui/app.component';
import { WebsocketService } from './crossconcern/webscoket/websocket.services';
import { ViewComponent } from './ui/view';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HomeComponent } from './ui/view/home';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import '../style/styles.scss';
import { SetupComponent } from './ui/view/setup';
import { ErrorHandlerHelper } from './crossconcern/helpers/errors/errorhandler.helper';
import { GameManager } from './crossconcern/managers/game.manager';
import { RemoteRepositoryInterface } from './datastore/remote/remote.interface';
import { RemoteRepository } from './datastore/remote/remote.repository';
import { PackRepositoryInterface } from './datastore/repositories/pack/pack.interface';
import { PackRepository } from './datastore/repositories/pack/pack.repository';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {SettingsComponent} from './ui/view/settings/settings.component';
import {LocalStorageRepositoryInterface} from './datastore/local/localstorage.interface';
import { LocalStorageRepository } from './datastore/local/localstorage.repository';
import {LobbyComponent} from './ui/view/lobby';
import { GuardHelper } from './crossconcern/helpers/generic/guard.helper';
import {DialogComponent} from './ui/components/dialog/dialog.component';
import {HostComponent} from './ui/components/host/host.component';
import {GameComponent} from './ui/view/game';


// Providers
const APP_PROVIDERS = [
  { provide: ErrorHandler, useClass: ErrorHandlerHelper },
  //Helpers
  GuardHelper,
  //Services
  WebsocketService,
  // Managers
  GameManager,
  // Repositories
  { provide: LocalStorageRepositoryInterface, useClass: LocalStorageRepository },
  { provide: RemoteRepositoryInterface, useClass: RemoteRepository },
  { provide: PackRepositoryInterface, useClass: PackRepository },
  // Helpers
  ErrorHandlerHelper,
];


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
      AppComponent,
      ViewComponent,
      HomeComponent,
      SetupComponent,
      SettingsComponent,
      LobbyComponent,
      GameComponent,

      // Components
      DialogComponent,
      HostComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
