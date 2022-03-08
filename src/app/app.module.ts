import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './loging/login.component';
import {PlanningComponent} from './planning/planning.component';
import {NewSportSessionComponent} from './new-sport-session/new-sport-session.component';
import {RouterModule, Routes} from "@angular/router";
import {GroupsComponent} from './groups/groups.component';
import {CreatePasswordComponent} from './reset-password/create-password.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoaderComponent} from './loader/loader.component';
import {DailyProgramComponent} from "./planning/daily-program/daily-program.component";
import {AuthGuard} from "./services/auth.guard";
import {HomePageComponent} from './home-page/home-page.component';
import {GroupComponent} from "./groups/group/group.component";
import {PlaceholderDirective} from "./directives/placeholder.directive";
import {PlageComponent} from './new-sport-session/plage/plage.component';
import {HiitComponent} from './new-sport-session/hiit/hiit.component';
import {FractionneComponent} from './new-sport-session/fractionne/fractionne.component';
import {
    MusculationComponent
} from './new-sport-session/musculation/musculation.component';
import {
    SerieMusculationComponent
} from './new-sport-session/musculation/serie-musculation/serie-musculation.component';
import {LoginSignupComponent} from './login-signup/login-signup.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {UserNameComponent} from './create-account/user-name/user-name.component';
import {SexComponent} from './create-account/sex/sex.component';
import {HeightWeightComponent} from './create-account/height-weight/height-weight.component';
import { SignupComponent } from './create-account/signup/signup.component';

const appRoutes: Routes = [
    {path: '', component: LoginSignupComponent},
    {path: 'connexion', component: LoginComponent},
    {
        path: 'creer-un-compte', component: CreateAccountComponent, children: [
            {path: 'email-mot-de-passe', component: SignupComponent},
            {path: 'idendite', component: UserNameComponent},
            {path: 'sexe', component: SexComponent},
            {path: 'taille-poids', component: HeightWeightComponent},
        ]
    },
    {path: 'mon-planning', canActivate: [AuthGuard], component: PlanningComponent},
    {path: 'accueil', canActivate: [AuthGuard], component: HomePageComponent},
    {
        path: 'nouvelle-seance',
        canActivate: [AuthGuard],
        component: NewSportSessionComponent
    },
    {path: 'groups', canActivate: [AuthGuard], component: GroupsComponent},
    {path: 'creer-nouveau-mot-passe', component: CreatePasswordComponent},
    {path: 'creer-nouveau-mot-passe/:userId', component: CreatePasswordComponent},
    {path: '**', redirectTo: ''}

];

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        LoginComponent,
        PlanningComponent,
        NewSportSessionComponent,
        GroupsComponent,
        GroupComponent,
        CreatePasswordComponent,
        LoaderComponent,
        DailyProgramComponent,
        HomePageComponent,
        PlaceholderDirective,
        PlageComponent,
        HiitComponent,
        FractionneComponent,
        MusculationComponent,
        SerieMusculationComponent,
        LoginSignupComponent,
        CreateAccountComponent,
        UserNameComponent,
        SexComponent,
        HeightWeightComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
