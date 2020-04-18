import { Routes } from '@angular/router';
import {EMPTY_PATH, HOME_PATH, VIEW_PATH} from '../../crossconcern/utilities/properties/path.property';
import {HomeComponent} from './home';

export const VIEW_ROUTES: Routes = [
    { path: EMPTY_PATH, redirectTo: HOME_PATH, pathMatch: 'full' },
    { path: VIEW_PATH, redirectTo: HOME_PATH, pathMatch: 'full' },
    { path: HOME_PATH, component: HomeComponent },

];
