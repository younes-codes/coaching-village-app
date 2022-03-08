import {Component, OnInit} from '@angular/core';
import {UserServices} from "../../services/user.services";
import {PlanningServices} from "../planning/planning.services";
import {User} from "../../models/user.model";
import {Session} from "../planning/plannings.data";


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    isLoading = true;
    user: User;
    nextSession: Session;

    constructor(private userServices: UserServices, private planningServices: PlanningServices) {
    }

    ngOnInit(): void {
        this.isLoading = false;
        this.user = this.userServices.user$.value;
        this.nextSession = this.planningServices.getNextSession();
        console.log(this.nextSession.img ? this.nextSession.img : this.nextSession.session);
    }

}
