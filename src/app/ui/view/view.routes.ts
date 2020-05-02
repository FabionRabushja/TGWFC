import { Routes } from '@angular/router';
import {
    EMPTY_PATH, GAME_PATH,
    HOME_PATH, LOBBY_LINK_PATH,
    LOBBY_PATH, POLICY_PRIVACY_PATH,
    SETTINGS_PATH,
    SETUP_PATH,
    VIEW_PATH
} from "../../crossconcern/utilities/properties/path.property";
import {HomeComponent} from './home';
import {SetupComponent} from './setup';
import {SettingsComponent} from './settings/settings.component';
import {LobbyComponent} from './lobby';
import {GuardHelper} from '../../crossconcern/helpers/generic/guard.helper';
import {GameComponent} from './game';
import {PolicyPrivacyComponent} from "./policyprivacy/policyprivacy.component";

export const VIEW_ROUTES: Routes = [
    { path: EMPTY_PATH, redirectTo: HOME_PATH, pathMatch: 'full' },
    { path: VIEW_PATH, redirectTo: HOME_PATH, pathMatch: 'full' },
    { path: HOME_PATH, component: HomeComponent },
    { path: SETUP_PATH, component: SetupComponent, canActivate: [GuardHelper]},
    { path: SETTINGS_PATH, component: SettingsComponent },
    { path: LOBBY_PATH + "/:id", component: LobbyComponent, canActivate: [GuardHelper]},
    { path: LOBBY_LINK_PATH + "/:id", component: LobbyComponent, canActivate: [GuardHelper]},
    { path: GAME_PATH, component: GameComponent, canActivate: [GuardHelper]},
    { path: POLICY_PRIVACY_PATH, component: PolicyPrivacyComponent},
];
