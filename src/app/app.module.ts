import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {LoginComponent} from './auth/loging/login.component';
import {PlanningComponent} from './pages/planning/planning.component';
import {NewSportSessionComponent} from './pages/new-sport-session/new-sport-session.component';
import {RouterModule, Routes} from "@angular/router";
import {GroupsComponent} from './pages/groups/groups.component';
import {CreatePasswordComponent} from './auth/reset-password/create-password.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoaderComponent} from './components/loader/loader.component';
import {DailyProgramComponent} from "./pages/planning/daily-program/daily-program.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomePageComponent} from './pages/home-page/home-page.component';
import {GroupComponent} from "./pages/groups/group/group.component";
import {PlaceholderDirective} from "./directives/placeholder.directive";
import {PlageComponent} from './pages/new-sport-session/plage/plage.component';
import {HiitComponent} from './pages/new-sport-session/hiit/hiit.component';
import {FractionneComponent} from './pages/new-sport-session/fractionne/fractionne.component';
import {
    MusculationComponent
} from './pages/new-sport-session/musculation/musculation.component';
import {
    SerieMusculationComponent
} from './pages/new-sport-session/musculation/serie-musculation/serie-musculation.component';
import {LoginSignupComponent} from './auth/login-signup/login-signup.component';
import {CreateAccountComponent} from './auth/create-account/create-account.component';
import {UserNameComponent} from './auth/create-account/user-name/user-name.component';
import {SexComponent} from './auth/create-account/sex/sex.component';
import {HeightWeightComponent} from './auth/create-account/height-weight/height-weight.component';
import { SignupComponent } from './auth/create-account/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {ImcComponent} from "./pages/profile/imc/imc.component";

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
    {path: 'mon-profil', canActivate: [AuthGuard], component: ProfileComponent},
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
        SignupComponent,
        ProfileComponent,
        ImcComponent
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
