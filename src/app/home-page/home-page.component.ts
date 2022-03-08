import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {UserServices} from "../services/user.services";
import {SeriesMusculation, SessionServices} from "../services/session.services";
import {tap} from "rxjs/operators";
import {HttpServices} from "../services/http.services";
import {PlanningServices} from "../planning/planning.services";
import {Session} from "../planning/plannings.data";


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    isLoading = true;

    constructor(private userServices: UserServices,
                private httpServices: HttpServices,
                private planningServices: PlanningServices,
                private sessionServices: SessionServices) {
    }

    ngOnInit(): void {
        this.isLoading = false;
    }

}
