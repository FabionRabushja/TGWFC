import { Routes } from "@angular/router";
import {EMPTY_PATH, VIEW_PATH} from "../../crossconcern/utilities/properties/path.property";
import {ViewComponent} from "./view.component";

export const VIEW_ROUTES: Routes = [
    { path: EMPTY_PATH, redirectTo: VIEW_PATH, pathMatch: "full" },
    { path: VIEW_PATH, component: ViewComponent}

];
